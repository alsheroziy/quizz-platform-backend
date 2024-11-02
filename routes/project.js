import express from 'express';
import { createProject, getAllProjects, likeProject, dislikeProject } from '../controllers/projectController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Loyiha qo'shish
router.post('/create', authMiddleware, createProject);

// Barcha loyihalarni olish
router.get('/', getAllProjects);

// Loyihaga like qo'shish
router.post('/:id/like', authMiddleware, likeProject);

// Loyihaga dislike qo'shish
router.post('/:id/dislike', authMiddleware, dislikeProject);

export default router;