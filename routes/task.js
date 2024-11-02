import express from 'express';
import { createTask, getUserTasks } from '../controllers/taskController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Vazifa yaratish
router.post('/create', authMiddleware, createTask);

// Foydalanuvchi uchun mavjud vazifalarni olish
router.get('/user-tasks', authMiddleware, getUserTasks);

export default router;