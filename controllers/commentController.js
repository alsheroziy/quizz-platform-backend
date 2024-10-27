const Quizz = require('../models/Quizz');

// Komment qo'shish
exports.addComment = async (req, res) => {
    const { comment } = req.body; // Body'dan comment olish
    try {
        const quizz = await Quizz.findById(req.params.quizzId); // Quizzni ID bilan topish
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz topilmadi' });
        }
        // Kommentni qo'shish
        quizz.comments.push({ userId: req.user.id, comment });
        await quizz.save();
        res.status(201).send("Komment qo'shildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};

// Admin javobi
exports.replyComment = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send("Ruxsat yo'q");

    const { reply } = req.body; // Admin javobini olish
    try {
        const quizz = await Quizz.findById(req.params.quizzId); // Quizzni ID bilan topish
        const comment = quizz.comments.id(req.params.commentId); // Kommentni ID bilan topish
        if (!comment) {
            return res.status(404).json({ message: 'Komment topilmadi' });
        }
        comment.adminReply = reply; // Admin javobini qo'shish
        await quizz.save();
        res.status(200).send("Javob qo'shildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};
