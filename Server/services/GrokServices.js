import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeSkillGap = async (userSkills, desiredRole) => {
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
      messages: [
        { role: "system", content: "You output ONLY JSON. No markdown." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("AI Analysis Failed");
  }
};

export default analyzeSkillGap;