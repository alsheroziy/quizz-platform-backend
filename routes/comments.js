const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

// Komment qo'shish
router.post('/:quizzId', authMiddleware, commentController.addComment);

// Admin javobini qo'shish
router.put('/reply/:quizzId/:commentId', authMiddleware, commentController.replyComment);

module.exports = router;
