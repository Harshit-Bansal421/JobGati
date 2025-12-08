import Groq from "groq-sdk";
import dotenv from "dotenv";
import SkillAnalysis from "../models/SkillAnalysis.js";
import UserProfile from "../models/UserProfile.js";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const analyzeSkillGap = async (req, res) => {
  try {
    const { userSkills, jobRole, jobDescription, clerkUserId } = req.body;

    console.log("📊 Skill Analysis Request:", { userSkills, jobRole });

    if (!userSkills || !jobRole) {
      return res.status(400).json({ error: "userSkills & jobRole are required" });
    }

    const prompt = `
      Act as an expert HR Skill Gap Analyzer.
      Candidate Skills: ${JSON.stringify(userSkills)}
      Job Role: ${jobRole}
      Job Description: ${jobDescription || "Not provided"}

      Return JSON only:
      {
        "readinessScore": <0-100>,
        "skillGapAnalysis": {
           "missingSkills": [],
           "criticalGaps": ""
        },
        "learningRoadmap": [
           { "action": "string" }
        ],
        "radarChartData": {
          "Technical": <0-10>,
          "Experience": <0-10>,
          "Tools": <0-10>,
          "SoftSkills": <0-10>
        }
      }
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Return only JSON. No markdown." },
        { role: "user", content: prompt }
      ]
    });

    const response = JSON.parse(completion.choices[0].message.content);

    // Save in DB
    if (clerkUserId) {
      const userProfile = await UserProfile.findOne({ clerkUserId });

      await SkillAnalysis.create({
        clerkUserId,
        userProfile: userProfile?._id,
        jobRole,
        userSkills,
        ...response
      });

      console.log("💾 Saved analysis in DB");
    }

    return res.json(response);

  } catch (error) {
    console.error("❌ GROQ ERROR", error);
    res.status(500).json({ error: "Skill analysis failed", details: error.message });
  }
};

export const getAnalysisHistory = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const history = await SkillAnalysis.find({ clerkUserId })
      .sort({ analysisDate: -1 })
      .limit(10);

    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: "History fetch failed", details: err.message });
  }
};
