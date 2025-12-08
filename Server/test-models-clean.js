
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        console.log(`Testing gemini-pro...`);
        const result = await model.generateContent("Hello?");
        console.log(`SUCCESS: gemini-pro responded: ${result.response.text()}`);
    } catch (error) {
        console.log(`FAILURE: gemini-pro - ${error.message}`);
    }
}

run();
