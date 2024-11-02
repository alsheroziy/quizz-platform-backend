// routes/blog.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// Blog yaratish
router.post('/create', authMiddleware, createBlog);

// Barcha bloglarni olish
router.get('/', getAllBlogs);

// Blogni ID bo'yicha olish
router.get('/:id', getBlogById);

// Blogni yangilash
router.put('/:id', authMiddleware, updateBlog);

// Blogni o'chirish
router.delete('/:id', authMiddleware, deleteBlog);

export default router;