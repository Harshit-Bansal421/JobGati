// server.js
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const { getMatchAnalysis } = require('./services/geminiService');

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from Server directory
dotenv.config({ path: join(__dirname, '../.env') });

import connectDB from "../configuration/mongodb.js";
import router from "../routes/userRoutes.js";
import jsrouter from "../routes/JobSeekerRoutes.js";
import businessrouter from "../routes/businessRoutes.js";
import jobrouter from "../routes/JobRoutes.js";
import skillrouter from "../routes/skillRoutes.js";
import profilerouter from "../routes/userProfileRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;  

// Connect to MongoDB
await connectDB()

// CORS Configuration - Allow requests from Vercel and localhost
app.use(
  cors({
    origin: ["https://job-gati-lq1t.vercel.app", "http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", router)
app.use("/api/jobseekers", jsrouter);
app.use("/api/business", businessrouter);
app.use("/api/jobs", jobrouter);
app.use("/api/skills", skillrouter);
app.use("/api/profile", profilerouter);

// THE API ROUTE
app.post('/api/match', async (req, res) => {
  try {
    const { userSkills, jobDescription } = req.body;
    
    // Call our Gemini Service
    const analysis = await getMatchAnalysis(userSkills, jobDescription);
    
    res.json(analysis); // Send JSON back to React
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to analyze" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
