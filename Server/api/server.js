// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";


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
app.use("/", ChatRoutes);

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



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
