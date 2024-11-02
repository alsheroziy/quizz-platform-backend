import express from 'express';
import { submitTaskResponse, reviewSubmission } from '../controllers/submissionController.js';
import authMiddleware from '../middleware/auth.js';
import upload from '../config/multer.js';

const router = express.Router();

// Foydalanuvchi tomonidan javob topshirish (ZIP yoki link)
router.post('/submit/:taskId', authMiddleware, upload.single('file'), submitTaskResponse);

// Admin tomonidan javobni baholash
router.put('/review/:submissionId', authMiddleware, reviewSubmission);

export default router;