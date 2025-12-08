import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getMatchAnalysis = async (userSkills, jobDescription) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // Ensure userSkills is a string if it's an array
    const skillsString = Array.isArray(userSkills) ? userSkills.join(", ") : userSkills;

    const prompt = `
      You are an expert AI Career Coach. 
      Compare these skills: "${skillsString}" 
      With this job description: "${jobDescription}"
      
      Output ONLY valid JSON with this exact structure (no markdown, no code blocks):
      {
        "matchPercentage": (number between 0-100),
        "graphData": {
          "Frontend": (number 0-10),
          "Backend": (number 0-10),
          "Tools": (number 0-10)
        },
        "missingSkills": ["skill1", "skill2"],
        "advice": "One short sentence of advice."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini AI API Error:", error);
    // Return dummy data on failure to prevent crash
    return {
      matchPercentage: 0,
      graphData: { Frontend: 0, Backend: 0, Tools: 0 },
      missingSkills: ["Error analyzing"],
      advice: "AI service is currently unavailable."
    };
  }
};