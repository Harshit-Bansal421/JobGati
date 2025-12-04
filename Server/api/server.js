// server.js
import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "../configuration/mongodb.js";
import router from "../routes/userRoutes.js";
import jsrouter from "../routes/JobSeekerRoutes.js";
import businessrouter from "../routes/businessRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;  

// Connect to MongoDB
await connectDB()

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

// Middlewares
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", router)
app.use("/api/jobseekers", jsrouter);
app.use("/api/businesses", businessrouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
