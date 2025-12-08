
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
        const modelName = "gemini-flash-latest";
        const model = genAI.getGenerativeModel({ model: modelName });
        log += `Testing ${modelName}...\n`;
        const result = await model.generateContent("Hello?");
        log += `SUCCESS: ${modelName} responded: ${result.response.text()}\n`;
    } catch (error) {
        // Try fallback to gemini-2.0-flash if that fails
       log += `FAILURE: gemini-flash-latest - ${error.message}\n`;
       try {
           const modelName2 = "gemini-2.0-flash";
           log += `Testing ${modelName2}...\n`;
           const model2 = genAI.getGenerativeModel({ model: modelName2 });
           const result2 = await model2.generateContent("Hello?");
           log += `SUCCESS: ${modelName2} responded: ${result2.response.text()}\n`;
       } catch (err2) {
           log += `FAILURE: gemini-2.0-flash - ${err2.message}\n`;
       }
    }
    
    fs.writeFileSync(join(__dirname, 'test_final_selection.txt'), log);
}

run();
