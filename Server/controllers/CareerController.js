import { Groq } from "groq-sdk";

// Initialize Groq lazily or in controller to ensure process.env is loaded
const getGroq = () => new Groq({ apiKey: process.env.GROQ_API_KEY });

export const startCareer = async (req, res) => {
  try {
    const { aim } = req.body;
    if (!aim) return res.status(400).json({ error: "Aim is required" });

    const prompt = `
      Generate 5 to 7 concise, direct questions to gather key applicant data for the role of: "${aim}".
      
      MANDATORY: If the role has strict eligibility criteria (e.g., Age limit for IAS/Civil Services, Physical height for Police, specific degree for Medicine), YOU MUST ASK about them.
      
      Requirements:
      1. Questions must be short one-liners (max 12 words).
      2. **STRUCTURE AS PROGRESSIVE**:
         - Q1-Q2: Mandatory Eligibility (Age, Degree, Attempts).
         - Q3-Q4: Fundamental/Intermediate Skills.
         - Q5-Q7: Advanced Concepts & Real-world Scenarios.
      3. Focus on objective data AND specific technical exposure.
      4. Return ONLY a raw JSON array of strings.
      
      Example: ["Current Age?", "Highest Degree?", "Years of Python exp?", "Have you built Rest APIs?", "Explain a time you optimized a DB query?"]
    `;

    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    let content = completion.choices[0].message.content.trim();
    // Cleanup if model adds markdown
    if (content.startsWith('```json')) content = content.replace(/^```json/, '').replace(/```$/, '');
    else if (content.startsWith('```')) content = content.replace(/^```/, '').replace(/```$/, '');
    
    // Parse response
    let questions;
    try {
        questions = JSON.parse(content);
    } catch (e) {
        throw new Error("AI returned invalid JSON: " + content);
    }
    
    if (!Array.isArray(questions)) throw new Error("AI did not return an array");

    res.json({ success: true, questions });
  } catch (err) {
    console.error("Groq Start Error:", err);
    res.status(500).json({ error: "Failed to generate questions: " + err.message });
  }
};

export const evaluate = async (req, res) => {
  try {
    const { aim, answers, userData } = req.body;

    const prompt = `
      You are a Senior Career Architect & Tech Lead.
      User Aim: "${aim}"
      
      User's Assessment Data:
      ${JSON.stringify(answers, null, 2)}
      
      CRITICAL INSTRUCTIONS:
      1. **NO FLUFF**: Avoid generic advice like "Stay motivated" or "Keep learning".
      2. **BE TECHNICAL & SPECIFIC**: If the user needs to learn React, specify "React Hooks, Redux Toolkit, and performance optimization".
      3. **DEEP ROADMAP**: The roadmap must cover **6 Months** in distinct phases (e.g., "Months 1-2: Core Foundations", "Months 3-6: Advanced Specialization").
      4. **REALITY CHECK**: Calculate 'market_success_rate' strictly based on the gap between current skills and market demands.

      GENERATE THIS EXACT JSON STRUCTURE (Return ONLY JSON):
      {
        "market_success_rate": 75,
        "success_ratio": "850 people qualify from 1000 applicants",
        "skills_user_has": ["Skill A", "Skill B"],
        "skill_gaps": ["Missing Skill X", "Missing Skill Y"],
        "roadmap": {
           "Phase 1: Foundations (Months 1-2)": "• Specific Task 1\n• Specific Task 2\n• Build Project X",
           "Phase 2: Advanced & Professional (Months 3-6)": "• Specific Task 3\n• specific Task 4"
        },
        "real_world_examples": [
          { "name": "Role Model Name", "how_they_succeeded": "Specific actionable path they took." }
        ],
        "final_advice": "One punchy, high-impact sentence.",
        "weak_skills_courses": [
          {
            "id": "u1",
            "skill_title": "Weak Skill Name",
            "description": "Technical reason for importance",
            "courses": [
               { "title": "Course Name", "link": "https://...", "platform": "Udemy/Coursera" }
            ]
          }
        ]
      }
    `;

    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    let content = completion.choices[0].message.content.trim();
    
    // Robust parsing: Find the first '{' and last '}'
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in response");
    }
    
    content = jsonMatch[0];

    const report = JSON.parse(content);

      // --- SAVE TO DB (UserProfile) ---
      if (userData?.clerkUserId && Array.isArray(report.weak_skills_courses)) {
        try {
             const UserProfile = (await import('../models/UserProfile.js')).default;
             
             const flatCourses = [];
             report.weak_skills_courses.forEach(skillGroup => {
                if (Array.isArray(skillGroup.courses)) {
                    skillGroup.courses.forEach(c => {
                        flatCourses.push({
                            skill: skillGroup.skill_title || "General",
                            courseTitle: c.title || "Unknown Course",
                            link: c.link || "#",
                            platform: c.platform || "Online",
                            description: skillGroup.description || ""
                        });
                    });
                }
             });

             await UserProfile.findOneAndUpdate(
                 { clerkUserId: userData.clerkUserId },
                 { $set: { trainingRecommendations: flatCourses, desiredPosition: aim } },
                 { new: true }
             );
             console.log("✅ Saved training recommendations to DB");
        } catch (dbErr) {
             console.error("❌ Failed to save to DB:", dbErr);
             // Do not throw here, allow the report to be returned even if DB save fails
        }
      }

    res.json({ report });
  } catch (err) {
    console.error("Groq Evaluate Error:", err);
    res.status(500).json({ error: err.message });
  }
};
