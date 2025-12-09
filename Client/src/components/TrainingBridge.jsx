import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getMatchAnalysis = async (userSkills, jobDescription) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Act as a strict Career Coach AI. 
    
    CONTEXT:
    User's Current Skills: ${JSON.stringify(userSkills)}
    Target Position/Description: "${jobDescription}"
    
    TASK:
    Analyze the gap between the user's skills and the job requirements.
    
    OUTPUT FORMAT:
    Return a strict JSON object (no markdown, no backticks). Follow this structure exactly:
    {
      "matchPercentage": <Integer between 0-100>,
      "missingSkills": [<Array of strings listing top 3-5 specific technical skills missing>],
      "graphData": {
        "Technical_Skills": <Integer 0-10>,
        "Experience_Match": <Integer 0-10>,
        "Tools_Stack": <Integer 0-10>,
        "Soft_Skills": <Integer 0-10>
      },
      "advice": "<Short 1 sentence advice>"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean JSON (removes markdown if Gemini adds it)
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to analyze skills.");
  }
};
