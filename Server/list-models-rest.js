
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
    let log = "Listing models...\n";
    try {
        // Warning: getGenerativeModel is for inference. 
        // To list models, we usually need the ModelService or similar, 
        // but the SDK exposes it via the GoogleGenerativeAI instance? 
        // Actually, no, the SDK is minimal. We might have to fetch via REST if the SDK doesn't expose listModels easily.
        // But let's try assuming the user might not have set up the project correctly.
        // We will do a direct fetch to the API endpoint using the key.
        
        const apiKey = process.env.GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        
        if (!response.ok) {
           log += `Error listing models: ${response.status} ${response.statusText}\n`;
           const body = await response.text();
           log += `Body: ${body}\n`;
        } else {
           const data = await response.json();
           log += `Models available:\n`;
           if (data.models) {
             data.models.forEach(m => log += `- ${m.name} (${m.supportedGenerationMethods})\n`);
           } else {
             log += "No models found in response.\n";
           }
        }
        
    } catch (error) {
        log += `FAILURE: ${error.message}\n`;
    }
    
    fs.writeFileSync(join(__dirname, 'list_models_result.txt'), log);
}

run();
