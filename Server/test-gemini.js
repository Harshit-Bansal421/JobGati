
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

console.log("Testing Gemini API...");

const API_KEY = "AIzaSyD5py9JhVjg6O7v1xCanHgC4rEV-TzLD2I"; 
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Backup
    
    console.log("Generating...");
    const result = await model.generateContent("Hello!");
    const response = await result.response;
    const text = response.text();
    console.log("Success! Response:", text);
    fs.writeFileSync('result_log.txt', "Success: " + text);
  } catch (error) {
    console.error("Error CAUGHT:", error.message);
    const details = JSON.stringify(error, null, 2);
    fs.writeFileSync('error_log.txt', error.message + "\n" + details);
  }
}

run();
