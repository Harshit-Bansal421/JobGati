import express from "express";
import { startCareer, evaluate } from "../controllers/CareerController.js";

const CBRouter = express.Router();

CBRouter.post("/career/start", startCareer);
CBRouter.post("/career/evaluate", evaluate);

export default CBRouter;
