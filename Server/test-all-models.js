
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-001",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.0-pro"
];

async function run() {
    let log = "Starting exhaustive model test...\n";
    
    for (const modelName of models) {
        log += `Testing ${modelName}...\n`;
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            log += `✅ SUCCESS: ${modelName} works!\n`;
        } catch (error) {
            log += `❌ FAILED: ${modelName} - ${error.message}\n`;
        }
        log += "---\n";
    }
    
    fs.writeFileSync(join(__dirname, 'test_matrix_result.txt'), log);
}

run();
