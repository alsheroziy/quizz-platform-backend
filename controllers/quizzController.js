const Quizz = require('../models/Quizz');

// Quizz yaratish
exports.createQuizz = async (req, res) => {
    const { title, description, questions } = req.body;
    const image = req.file ? req.file.path : null;

    if (req.user.role !== 'admin') return res.status(403).send("Ruxsat yo'q");

    try {
        const quizz = new Quizz({ title, description, questions, createdBy: req.user.userId });
        await quizz.save();
        res.status(201).send("Quizz yaratildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};

// Komment qo'shish
exports.addComment = async (req, res) => {
    const { comment } = req.body;
    try {
        const quizz = await Quizz.findById(req.params.quizzId);
        quizz.comments.push({ userId: req.user.userId, comment });
        await quizz.save();
        res.status(201).send("Komment qo'shildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};

// Kommentlarni olish
exports.getComments = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.quizzId).populate('comments.userId', 'firstname lastname');
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz topilmadi' });
        }
        res.status(200).json({ comments: quizz.comments });
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};

// Like qo'shish
exports.likeQuizz = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.id);
        quizz.likes += 1;
        await quizz.save();
        res.status(200).send("Like bosildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};

// Dislike qo'shish
exports.dislikeQuizz = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.id);
        quizz.dislikes += 1;
        await quizz.save();
        res.status(200).send("Dislike bosildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};
