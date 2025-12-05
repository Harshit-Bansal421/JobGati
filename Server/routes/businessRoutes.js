
import express from "express";
import { createBusiness, getBusinesses, getBusinessById, updateBusiness, deleteBusiness } from "../controllers/BusinessController.js";

const businessrouter = express.Router();

businessrouter.post("/create", createBusiness);
businessrouter.get("/all", getBusinesses);
businessrouter.get("/:id", getBusinessById);
businessrouter.put("/update/:id", updateBusiness);
businessrouter.delete("/delete/:id", deleteBusiness);

export default businessrouter;

