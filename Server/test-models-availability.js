
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    // For listing models, we might need to access the model list endpoint directly 
    // or just try a standard model to gauge access.
    // The SDK might not have a direct 'listModels' helper exposed easily on the main class in all versions,
    // but usually it's not the primary way to debug.
    // Let's try to just run a simple prompt on 'gemini-1.5-flash' and 'gemini-pro' to see which works.
    
    const modelsToTest = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];
    
    for (const modelName of modelsToTest) {
        console.log(`Testing model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you there?");
            console.log(`✅ Model ${modelName} is working. Response: ${result.response.text()}`);
        } catch (error) {
            console.log(`❌ Model ${modelName} failed: ${error.message}`);
        }
    }
  } catch (error) {
    console.error("Fatal error:", error);
  }
}

listModels();
