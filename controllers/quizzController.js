import Quizz from '../models/quizz.js';

// Create a quiz
export const createQuizz = async (req, res) => {
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

// Add a comment
export const addComment = async (req, res) => {
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

// Get comments
export const getComments = async (req, res) => {
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

// Add a like
export const likeQuizz = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.id);
        quizz.likes += 1;
        await quizz.save();
        res.status(200).send("Like bosildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};

// Add dislike
export const dislikeQuizz = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.id);
        quizz.dislikes += 1;
        await quizz.save();
        res.status(200).send("Dislike bosildi");
    } catch (err) {
        res.status(400).send("Xatolik yuz berdi");
    }
};
