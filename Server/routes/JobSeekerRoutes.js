
import express from "express";
import { createJobSeeker, getAllJobSeekers, getJobSeekerById, updateJobSeeker, deleteJobSeeker } from "../controllers/JobSeekerController.js";

const jsrouter = express.Router();

jsrouter.post("/create", createJobSeeker);
jsrouter.get("/all", getAllJobSeekers);
jsrouter.get("/:id", getJobSeekerById);
jsrouter.put("/update/:id", updateJobSeeker);
jsrouter.delete("/delete/:id", deleteJobSeeker);

export default jsrouter;
