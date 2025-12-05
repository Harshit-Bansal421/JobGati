// routes/userRoutes.js
import express from "express";

import { createUser, getUsers} from "../controllers/UserController.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/all", getUsers);

export default router;
