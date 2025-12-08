
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    let log = "";
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        log += `Testing gemini-pro...\n`;
        const result = await model.generateContent("Hello?");
        log += `SUCCESS: gemini-pro responded: ${result.response.text()}\n`;
    } catch (error) {
        log += `FAILURE: gemini-pro - ${error.message}\n`;
        log += `Stack: ${error.stack}\n`;
    }
    
    fs.writeFileSync(join(__dirname, 'test_result_final.txt'), log);
}

run();
