import express from 'express';
import { createProject, getAllProjects, likeProject, dislikeProject, addComment, getComments, getTopUsers } from '../controllers/projectController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Loyiha qo'shish
router.post('/create', authMiddleware, createProject);

// Barcha loyihalarni olish
router.get('/', getAllProjects);

// Eng ko'p like va ko'rishga ega foydalanuvchilarni olish
router.get('/top-users', getTopUsers);

// Loyihaga like qo'shish
router.post('/:id/like', authMiddleware, likeProject);

// Loyihaga dislike qo'shish
router.post('/:id/dislike', authMiddleware, dislikeProject);

// Loyihaga izoh qo'shish
router.post('/:id/comments', authMiddleware, addComment);

// Loyihaga qo'shilgan izohlarni olish
router.get('/:id/comments', getComments);

export default router;