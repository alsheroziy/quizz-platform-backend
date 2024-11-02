// routes/admin.js

import express from 'express';
import { deleteUser, getUserCount, getQuizzCount, editQuizz, getUsers } from '../controllers/adminController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Foydalanuvchilar ro'yxatini olish (sahifalash bilan)
router.get('/users', authMiddleware, getUsers);

// Foydalanuvchini o'chirish
router.delete('/users/:id', authMiddleware, deleteUser);

// Ro'yxatdan o'tgan foydalanuvchilar sonini olish
router.get('/user-count', authMiddleware, getUserCount);

// Yaratilgan savollar sonini olish
router.get('/quizz-count', authMiddleware, getQuizzCount);

// Savolni (quizz) tahrirlash
router.put('/quizz/:id', authMiddleware, editQuizz);

export default router;