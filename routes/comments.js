// routes/comment.js
import express from 'express';
import * as commentController from '../controllers/commentController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Komment qo'shish
router.post('/:quizzId', authMiddleware, commentController.addComment);

// Admin javobini qo'shish
router.put('/reply/:quizzId/:commentId', authMiddleware, commentController.replyComment);

// Kommentlarni olish
router.get('/:quizzId', commentController.getComments);

export default router;