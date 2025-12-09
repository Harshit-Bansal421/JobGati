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
    
    const questions = JSON.parse(content);
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
      You are an expert Career Path AI with strict evaluation standards.
      The user's aim: ${aim}
      
      User's answers to mandatory questions:
      ${JSON.stringify(answers, null, 2)}
      
      Additional user dashboard data (may be null):
      ${JSON.stringify(userData || {}, null, 2)}
      
      Task: Perform a rigorous assessment.
      1. Calculate 'market_success_rate' based on real-world difficulty and user's profile match. 
         (e.g., If aiming for Google with 0 exp, probability should be very low).
      2. If mandatory criteria (Age/Degree) are failing, probability MUST be near 0.
      
      Output Schema:

      Based on this, generate a detailed JSON output:
      {
        "skills_required": [...],
        "skills_user_has": [...],
        "skill_gaps": [...],
        "market_success_rate": number, // Percentage of people with similar skills who successfully secured this role
        "roadmap": {
          "next_1_month": "...",
          "next_3_months": "...",
          "next_6_months": "...",
          "next_1_year": "..."
        },
        "real_world_examples": [
          { "name": "Name/Profile", "how_they_succeeded": "Brief story of someone with similar background who made it." }
        ],
        "final_advice": "...",
        "training_bridge": [
          {
            "skill": "Name of the missing skill",
            "course_name": "Recommended Course Name",
            "platform": "Udemy/Coursera/Youtube/etc",
            "url": "Valid URL to the course or search query URL"
          }
        ]
      }
    `;

    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    let content = completion.choices[0].message.content.trim();
    
    // Robust parsing: Find the first '{' and last '}'
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in response");
    }
    
    content = jsonMatch[0];

    let report;
    try {
      report = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Content:", content);
      throw new Error("Failed to parse AI response");
    }

    res.json({ report });
  } catch (err) {
    console.error("Groq Evaluate Error:", err);
    res.status(500).json({ error: err.message });
  }
};
