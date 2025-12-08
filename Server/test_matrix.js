
import { GoogleGenerativeAI } from "@google/generative-ai";

const KEYS = [
  { name: "CLIENT_KEY", key: "AIzaSyD5py9JhVjg6O7v1xCanHgC4rEV-TzLD2I" },
  { name: "SERVER_KEY", key: "AIzaSyCVNDmKDZeZxI91W28PrB234BW-irQUzAE" }
];

const MODELS = [
  "gemini-1.5-flash",
  "gemini-pro",
  "gemini-1.5-pro-latest"
];

async function testCombination(keyName, key, modelName) {
  console.log(`Testing ${keyName} with ${modelName}...`);
  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hi");
    const response = await result.response;
    console.log(`✅ SUCCESS: ${keyName} + ${modelName}`);
    return true;
  } catch (error) {
    console.log(`❌ FAILED: ${keyName} + ${modelName} - ${error.message.split('\n')[0]}`);
    return false;
  }
}

async function run() {
  console.log("Starting Matrix Test...");
  for (const k of KEYS) {
    for (const m of MODELS) {
      await testCombination(k.name, k.key, m);
    }
  }
}

run();
