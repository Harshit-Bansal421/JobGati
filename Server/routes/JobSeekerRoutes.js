
import express from "express";
import { createJobSeeker, getAllJobSeekers, updateJobSeeker, deleteJobSeeker } from "../controllers/JobSeekerController.js";

const jsrouter = express.Router();

jsrouter.post("/create", createJobSeeker);
jsrouter.get("/all", getAllJobSeekers);
jsrouter.put("/update/:id", updateJobSeeker);
jsrouter.delete("/delete/:id", deleteJobSeeker);

export default jsrouter;
