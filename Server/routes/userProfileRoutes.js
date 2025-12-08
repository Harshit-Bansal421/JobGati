import express from 'express';
import { saveProfile, getProfile } from '../controllers/userProfileController.js';

const router = express.Router();

// POST /api/profile/save - Save or update user profile
router.post('/save', saveProfile);

// GET /api/profile/:clerkUserId - Get user profile by Clerk ID
router.get('/:clerkUserId', getProfile);

export default router;
