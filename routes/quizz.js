const express = require('express');
const router = express.Router();
const quizzController = require('../controllers/quizzController');
const authMiddleware = require('../middleware/auth');

// Quizz yaratish
router.post('/create', authMiddleware, quizzController.createQuizz);

// Quizzga comment qo'shish
router.post('/:quizzId/comments', authMiddleware, quizzController.addComment);

// Quizzga commentlarni olish
router.get('/:quizzId/comments', authMiddleware, quizzController.getComments);

// Quizzga like qo'shish
router.post('/like/:id', authMiddleware, quizzController.likeQuizz);

// Quizzga dislike qo'shish
router.post('/dislike/:id', authMiddleware, quizzController.dislikeQuizz);

module.exports = router;
