import express from "express";
import { saveDashboardData } from "../controllers/DashboardController.js";

const dashboardrouter = express.Router();

dashboardrouter.post("/save", saveDashboardData);

export default dashboardrouter;
