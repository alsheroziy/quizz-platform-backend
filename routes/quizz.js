import express from 'express';
import * as quizzController from '../controllers/quizzController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Quizz create
router.post('/create', authMiddleware, quizzController.createQuizz);

// Add a comment to the quiz
router.post('/:quizzId/comments', authMiddleware, quizzController.addComment);

// Get comments on the quiz
router.get('/:quizzId/comments', authMiddleware, quizzController.getComments);

// Add a like to the quiz
router.post('/like/:id', authMiddleware, quizzController.likeQuizz);

// Dislike the quiz
router.post('/dislike/:id', authMiddleware, quizzController.dislikeQuizz);

export default router;
