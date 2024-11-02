// controllers/commentController.js
import Quizz from '../models/quizz.js';

// Komment qo'shish
export const addComment = async (req, res) => {
    const { comment } = req.body;
    try {
        const quizz = await Quizz.findById(req.params.quizzId);
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz topilmadi' });
        }
        quizz.comments.push({ userId: req.user.id, comment });
        await quizz.save();
        res.status(201).json({ message: "Komment qo'shildi" });
    } catch (err) {
        res.status(400).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Kommentlarga admin javobi
export const replyComment = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Ruxsat yo'q" });

    const { reply } = req.body;
    try {
        const quizz = await Quizz.findById(req.params.quizzId);
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz topilmadi' });
        }
        const comment = quizz.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Komment topilmadi' });
        }
        comment.adminReply = reply;
        await quizz.save();
        res.status(200).json({ message: "Javob qo'shildi" });
    } catch (err) {
        res.status(400).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Kommentlarni olish
export const getComments = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.quizzId).populate('comments.userId', 'firstname lastname');
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz topilmadi' });
        }
        res.status(200).json({ comments: quizz.comments });
    } catch (err) {
        res.status(400).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};