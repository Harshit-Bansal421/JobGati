// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dashboardrouter from "../routes/dashboardRoutes.js";
// Get current directory for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env
dotenv.config({ path: join(__dirname, "../.env") });

// DB + Services
import connectDB from "../configuration/mongodb.js";
import analyzeSkillGap from "../services/GrokServices.js";

// Routes
import router from "../routes/userRoutes.js";
import jsrouter from "../routes/JobSeekerRoutes.js";
import businessrouter from "../routes/businessRoutes.js";
import jobrouter from "../routes/JobRoutes.js";
import skillrouter from "../routes/skillRoutes.js";
import profilerouter from "../routes/userProfileRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Failed", err);
    process.exit(1);
  });

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

// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// API Routes
app.use("/api/dashboard", dashboardrouter);
app.use("/api/users", router);
app.use("/api/jobseekers", jsrouter);
app.use("/api/business", businessrouter);
app.use("/api/jobs", jobrouter);
app.use("/api/skills", skillrouter);
app.use("/api/profile", profilerouter);

// Analyze Skill Gap Route
app.post("/api/skills/analyze-gap", async (req, res) => {
  try {
    const { userSkills, jobRole } = req.body;

    console.log(`Analyzing skill gap for role: ${jobRole}...`);

    const data = await analyzeSkillGap(userSkills, jobRole);

    res.json(data);
  } catch (error) {
    console.error("Skill Gap Error:", error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
