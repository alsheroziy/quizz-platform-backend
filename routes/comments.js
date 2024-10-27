import express from 'express';
import * as commentController from '../controllers/commentController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Add a comment
router.post('/:quizzId', authMiddleware, commentController.addComment);

// Add admin response
router.put('/reply/:quizzId/:commentId', authMiddleware, commentController.replyComment);

export default router;
