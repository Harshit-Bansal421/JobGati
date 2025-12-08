const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getMatchAnalysis = async (userSkills, jobDescription) => {
  try {
    // Use correct supported model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const prompt = `
Act as a strict Career Coach AI.

User Skills: ${JSON.stringify(userSkills)}
Job Description: "${jobDescription}"

Return ONLY pure JSON in this exact format:
{
  "matchPercentage": number between 0-100,
  "missingSkills": [array of missing skill strings],
  "graphData": {
    "Technical_Skills": number 0-10,
    "Experience_Match": number 0-10,
    "Tools_Stack": number 0-10,
    "Soft_Skills": number 0-10
  },
  "advice": "One sentence advice"
}
DO NOT write text outside JSON.
    `;

    // Generate AI response
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Remove markdown code block wrappers (if Gemini adds them)
    text = text.replace(/```json|```/g, "").trim();

    // Parse JSON safely
    return JSON.parse(text);

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    throw new Error("Failed to analyze skills using Gemini AI.");
  }
};

module.exports = { getMatchAnalysis };
