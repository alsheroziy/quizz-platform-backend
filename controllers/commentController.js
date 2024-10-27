import Quizz from '../models/quizz.js';

// Add a comment
export const addComment = async (req, res) => {
    const { comment } = req.body; // Get comment from Body
    try {
        const quizz = await Quizz.findById(req.params.quizzId); // Find the quiz by ID
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz topilmadi' });
        }
        // Add a comment
        quizz.comments.push({ userId: req.user.id, comment });
        await quizz.save();
        res.status(201).send("Komment qo'shildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};

// Admin response
export const replyComment = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send("Ruxsat yo'q");

    const { reply } = req.body; // Get admin response
    try {
        const quizz = await Quizz.findById(req.params.quizzId); // Find the quiz by ID
        const comment = quizz.comments.id(req.params.commentId); // Find a comment by ID
        if (!comment) {
            return res.status(404).json({ message: 'Komment topilmadi' });
        }
        comment.adminReply = reply; // Add admin response
        await quizz.save();
        res.status(200).send("Javob qo'shildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};
