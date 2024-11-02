// routes/user.js
import express from 'express';
import { updateUserProfile, deleteUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Foydalanuvchi profilini yangilash
router.put('/update-profile', authMiddleware, updateUserProfile);

// Foydalanuvchi profilini o'chirish
router.delete('/delete-profile', authMiddleware, deleteUserProfile);

export default router;