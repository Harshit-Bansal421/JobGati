// routes/userRoutes.js
import express from "express";

import { createUser, getUsers, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/all", getUsers);

export default router;
