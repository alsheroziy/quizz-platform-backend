// routes/task.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { 
    createTask, 
    getUserTasks, 
    submitTask, 
    reviewTaskSubmission, 
    getUserSubmissions 
} from '../controllers/taskController.js';

const router = express.Router();

// Vazifa yaratish
router.post('/create', authMiddleware, createTask);

// Foydalanuvchining vazifalarini olish
router.get('/user-tasks', authMiddleware, getUserTasks);

// Vazifa topshirig'ini yuborish
router.post('/submit', authMiddleware, submitTask);

// Vazifa topshirig'ini ko'rib chiqish (admin tomonidan)
router.put('/review/:submissionId', authMiddleware, reviewTaskSubmission);

// Foydalanuvchining yuborilgan topshiriqlarini olish
router.get('/user-submissions', authMiddleware, getUserSubmissions);

export default router;