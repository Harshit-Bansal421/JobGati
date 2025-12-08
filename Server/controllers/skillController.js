import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import SkillAnalysis from '../models/SkillAnalysis.js';
import UserProfile from '../models/UserProfile.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeSkillGap = async (req, res) => {
  try {
    const { userSkills, jobRole, jobDescription, clerkUserId } = req.body;

    console.log("📊 Skill Analysis Request:", { userSkills, jobRole, clerkUserId });

    // Validate input
    if (!userSkills || !jobRole) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields: userSkills and jobRole" });
    }

    console.log("🔑 API Key exists:", !!process.env.GEMINI_API_KEY);

    // SELECT THE MODEL (Flash is fast & free)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // THE PROMPT - Strictly tell it to output JSON for our graphs
    const prompt = `
      Act as an expert HR Algorithm.
      
      INPUT DATA:
      - Candidate's Skills: ${JSON.stringify(userSkills)}
      - Job Role: "${jobRole}"
      - Job Description: "${jobDescription || 'Not provided'}"

      TASK:
      Compare the candidate's skills with the job requirements.
      Handle synonyms (e.g., 'React' == 'React.js', 'Wiring' == 'Electrical').

      OUTPUT FORMAT:
      Return ONLY a valid JSON object (no markdown, no backticks) with this exact structure:
      {
        "matchScore": (integer between 0-100),
        "missingSkills": ["List", "of", "critical", "missing", "skills"],
        "radarChartData": {
          "Technical": (integer 0-10),
          "Practical": (integer 0-10),
          "SoftSkills": (integer 0-10),
          "Tools": (integer 0-10)
        },
        "oneLineAdvice": "A short, encouraging advice string."
      }
    `;

    console.log("🤖 Calling Gemini AI...");

    // GENERATE CONTENT
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log("✅ Gemini Response received");

    // CLEANUP (Remove markdown backticks if Gemini adds them)
    text = text.replace(/```json|```/g, '').trim();

    // PARSE & SEND TO FRONTEND
    const jsonResponse = JSON.parse(text);
    
    // Save to database if clerkUserId is provided
    if (clerkUserId) {
      try {
        // Find user profile
        const userProfile = await UserProfile.findOne({ clerkUserId });
        
        const analysisData = {
          clerkUserId,
          userProfile: userProfile?._id,
          jobRole,
          userSkills,
          ...jsonResponse
        };

        const analysis = new SkillAnalysis(analysisData);
        await analysis.save();
        console.log("💾 Analysis saved to database");
      } catch (dbError) {
        console.error("⚠️ Failed to save analysis to DB:", dbError);
        // Continue anyway, don't fail the request
      }
    }

    console.log("📤 Sending response:", jsonResponse);
    res.json(jsonResponse);

  } catch (error) {
    console.error("❌ AI Error:", error);
    console.error("Error Stack:", error.stack);
    res.status(500).json({ error: "Failed to analyze skills", details: error.message });
  }
};

// Get skill analysis history for a user
export const getAnalysisHistory = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    
    console.log("📜 Fetching analysis history for:", clerkUserId);

    const history = await SkillAnalysis.find({ clerkUserId })
      .sort({ analysisDate: -1 })
      .limit(10);

    res.json({
      success: true,
      history
    });

  } catch (error) {
    console.error("❌ Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch history", details: error.message });
  }
};
