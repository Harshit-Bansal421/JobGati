// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Groq } from "groq-sdk";

// Load base .env
dotenv.config();

// ✅ Import Chat Routes (You forgot this earlier)
import ChatRoutes from "../routes/ChatRoutes.js";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from correct directory
dotenv.config();

// DB + other routes
import connectDB from "../configuration/mongodb.js";
import router from "../routes/userRoutes.js";
import jsrouter from "../routes/JobSeekerRoutes.js";
import businessrouter from "../routes/businessRoutes.js";
import jobrouter from "../routes/JobRoutes.js";
import skillrouter from "../routes/skillRoutes.js";
import profilerouter from "../routes/userProfileRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Connect to MongoDB
await connectDB();

// CORS
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// All API routes
app.use("/api/users", router);
app.use("/api/jobseekers", jsrouter);
app.use("/api/business", businessrouter);
app.use("/api/jobs", jobrouter);
app.use("/api/skills", skillrouter);
app.use("/api/profile", profilerouter);

// ✅ ADD THIS — enables /career/start and /career/evaluate routes
app.use("/", chatRoutes);

// MATCH API (Gemini)
app.post("/api/match", async (req, res) => {
  try {
    const { userSkills, jobDescription } = req.body;

    const analysis = await getMatchAnalysis(userSkills, jobDescription);
    res.json(analysis);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to analyze" });
  }
});

// Groq Career Evaluation
app.post("/career/evaluate", async (req, res) => {
  try {
    const { aim, answers, userData } = req.body;

    const prompt = `
      You are a professional Career Path AI.
      The user's aim: ${aim}

      User's answers to mandatory questions:
      ${JSON.stringify(answers, null, 2)}

      Additional user dashboard data (may be null):
      ${JSON.stringify(userData || {}, null, 2)}

      Based on this, generate a detailed JSON output:
      {
        "skills_required": [...],
        "skills_user_has": [...],
        "skill_gaps": [...],
        "success_probability_percent": number,
        "roadmap": {
          "next_1_month": "...",
          "next_3_months": "...",
          "next_6_months": "...",
          "next_1_year": "..."
        },
        "real_world_examples": [
          { "name": "Person", "how_they_succeeded": "..." }
        ],
        "final_advice": "..."
      }
    `;

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const report = JSON.parse(completion.choices[0].message.content);
    res.json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
