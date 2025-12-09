import express from "express";
import {
  saveDashboardData,
  getDashboardData
} from "../controllers/DashboardController.js";

const dashboardrouter = express.Router();

dashboardrouter.post("/save", saveDashboardData);
dashboardrouter.get("/get/:clerkUserId", getDashboardData);

export default dashboardrouter;
