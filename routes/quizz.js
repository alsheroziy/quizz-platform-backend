// routes/quizz.js
import express from 'express';
import * as quizzController from '../controllers/quizzController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Quizz yaratish
router.post('/create', authMiddleware, quizzController.createQuizz);

// Barcha quizzlarni olish
router.get('/', quizzController.getAllQuizzes);

// Quizzni ID bo'yicha olish
router.get('/:id', quizzController.getQuizzById);

// Quizzga javoblarni yuborish
router.post('/:id/submit', authMiddleware, quizzController.submitQuizz);

// Quizzga like qo'shish
router.post('/like/:id', authMiddleware, quizzController.likeQuizz);

// Quizzga dislike qo'shish
router.post('/dislike/:id', authMiddleware, quizzController.dislikeQuizz);

export default router;