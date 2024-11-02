// controllers/quizzController.js
import Quizz from '../models/quizz.js';
import Submission from '../models/submission.js'; // Submission modelini import qilamiz

// Barcha quizzlarni olish (kategoriya bo'yicha qidirish bilan)
export const getAllQuizzes = async (req, res) => {
    try {
        const { category } = req.query; // Query orqali kategoriya olamiz
        const query = category ? { category: { $regex: category, $options: "i" } } : {}; // Agar kategoriya bo'lsa, filter qo'llanadi

        const quizzes = await Quizz.find(query, '-questions.answer').populate('createdBy', 'firstname lastname');
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Quizz yaratish
export const createQuizz = async (req, res) => {
    const { title, description, category, questions, image, timeLimit } = req.body;

    if (req.user.role !== 'admin') return res.status(403).json({ message: "Ruxsat yo'q" });

    try {
        for (let question of questions) {
            if (!question.options.includes(question.answer)) {
                return res.status(400).json({
                    message: `Savol "${question.question}" uchun javob variantlar ichida emas`,
                });
            }
        }

        const quizz = new Quizz({
            title,
            description,
            category,
            questions,
            image: image || null,
            timeLimit: timeLimit ? new Date(timeLimit) : null, // Sana va vaqt limitini saqlash
            createdBy: req.user.id,
        });
        await quizz.save();
        res.status(201).json({ message: "Quizz yaratildi", quizz });
    } catch (err) {
        res.status(400).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Quizzni ID bo'yicha olish
export const getQuizzById = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.id, '-questions.answer').populate('createdBy', 'firstname lastname');
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz topilmadi' });
        }
        res.status(200).json(quizz);
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Quizzga javoblarni yuborish
export const submitQuizz = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.id);
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz topilmadi' });
        }

        const userAnswers = req.body.answers; // { questionId: answer, ... }

        // Savol ID larini string formatga o'girib, to'plam (Set) yaratamiz
        const questionIds = new Set(quizz.questions.map(q => q._id.toString()));

        // Foydalanuvchining yuborgan javoblarini tekshiramiz
        for (let questionId of Object.keys(userAnswers)) {
            if (!questionIds.has(questionId)) {
                return res.status(400).json({ message: `Noto'g'ri savol ID: ${questionId}` });
            }
            const answer = userAnswers[questionId];
            if (typeof answer !== 'string') {
                return res.status(400).json({ message: `Javob noto'g'ri formatda: ${questionId}` });
            }
        }

        let score = 0;

        quizz.questions.forEach((question) => {
            const questionIdStr = question._id.toString();
            const userAnswer = userAnswers[questionIdStr];
            if (userAnswer && userAnswer === question.answer) {
                score += 1;
            }
        });

        // Javoblarni va natijani saqlaymiz
        const submission = new Submission({
            user: req.user.id,
            quizz: quizz._id,
            score: score,
            totalQuestions: quizz.questions.length,
            answers: userAnswers
        });
        await submission.save();

        res.status(200).json({ score, total: quizz.questions.length });
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};


// Like
export const likeQuizz = async (req, res) => {
    try {
        await Quizz.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
        res.status(200).json({ message: "Like bosildi" });
    } catch (err) {
        res.status(400).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Dislike
export const dislikeQuizz = async (req, res) => {
    try {
        await Quizz.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } });
        res.status(200).json({ message: "Dislike bosildi" });
    } catch (err) {
        res.status(400).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};