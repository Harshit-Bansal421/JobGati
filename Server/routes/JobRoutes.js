import express from "express";
import { createJob, getJobsByBusiness, updateJob, deleteJob, toggleJobStatus } from "../controllers/JobController.js";

const jobRouter = express.Router();

jobRouter.post("/create", createJob);
jobRouter.get("/business/:businessId", getJobsByBusiness);
jobRouter.put("/update/:id", updateJob);
jobRouter.delete("/delete/:id", deleteJob);
jobRouter.patch("/toggle-status/:id", toggleJobStatus);

export default jobRouter;
