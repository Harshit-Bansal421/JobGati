// routes/userRoutes.js
import express from "express";

import { createUser, getUsers, loginUser, getUserByEmail } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/get-by-email", getUserByEmail);
router.get("/all", getUsers);

export default router;
