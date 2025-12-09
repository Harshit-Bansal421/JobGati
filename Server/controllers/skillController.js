// skillController.js (FINAL – ES MODULE + GROQ)
import dotenv from "dotenv";
import SkillAnalysis from "../models/SkillAnalysis.js";
import UserProfile from "../models/UserProfile.js";
import Groq from "groq-sdk";

dotenv.config();

// Initialize Groq Client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/* --------------------------------------------------------
   GROQ AI FUNCTION (ES MODULE VERSION)
---------------------------------------------------------*/
export const runGroqAnalysis = async (userSkills, desiredRole) => {
  const prompt = `
    Act as a Career Coach.
    User Skills: ${JSON.stringify(userSkills)}
    Desired Role: "${desiredRole}"

    Return strict JSON with these keys:
    - readinessScore (0-100)
    - skillGapAnalysis (object with 'missingSkills' array and 'criticalGaps' string)
    - learningRoadmap (array of steps)
    - radarChartData (object with keys: Technical, Experience, Tools, SoftSkills)
  `;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You output ONLY JSON. No markdown." },
        { role: "user", content: prompt }
      ]
    });

    return JSON.parse(completion.choices[0].message.content);

  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("AI Analysis Failed");
  }
};

/* --------------------------------------------------------
   MAIN CONTROLLER USED BY ROUTE
---------------------------------------------------------*/
export const analyzeSkillGap = async (req, res) => {
  try {
    const { userSkills, jobRole, clerkUserId } = req.body;

    console.log("📊 Skill Analysis Request:", { userSkills, jobRole, clerkUserId });

    if (!userSkills || !jobRole) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("🤖 Calling Groq AI...");
    const aiResult = await runGroqAnalysis(userSkills, jobRole);

    console.log("✅ AI Response:", aiResult);

    /* ---------------------------------------------
       SAVE TO DATABASE (IF USER IS LOGGED IN)
    ----------------------------------------------*/
    if (clerkUserId) {
      const userProfile = await UserProfile.findOne({ clerkUserId });

      const analysisData = {
        clerkUserId,
        jobRole,
        userSkills,
        readinessScore: aiResult.readinessScore,
        skillGapAnalysis: aiResult.skillGapAnalysis,
        learningRoadmap: aiResult.learningRoadmap,
        radarChartData: aiResult.radarChartData,
        userProfile: userProfile?._id || null
      };

      const analysis = new SkillAnalysis(analysisData);
      await analysis.save();

      console.log("💾 Analysis saved to DB");
    }

    return res.json(aiResult);

  } catch (error) {
    console.error("❌ Final Error:", error);
    res.status(500).json({ error: "Skill gap analysis failed", details: error.message });
  }
};

/* --------------------------------------------------------
   HISTORY CONTROLLER
---------------------------------------------------------*/
export const getAnalysisHistory = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const history = await SkillAnalysis.find({ clerkUserId })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.json({ success: true, history });

  } catch (error) {
    console.error("❌ History Error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
