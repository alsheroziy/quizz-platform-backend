// controllers/adminController.js

import User from '../models/user.js';
import Quizz from '../models/quizz.js';

// Foydalanuvchilar ro'yxatini olish (sahifalash bilan)
export const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Sahifa raqami, standart 1
        const limit = parseInt(req.query.limit) || 10; // Har bir sahifada nechtalik, standart 10
        const skip = (page - 1) * limit; // Qaysi foydalanuvchidan boshlab olish kerakligini hisoblash

        const users = await User.find({}, 'firstname lastname email image createdAt') // `image` maydonini qo'shamiz
                                .skip(skip)
                                .limit(limit);

        const totalUsers = await User.countDocuments(); // Foydalanuvchilarning umumiy soni
        const totalPages = Math.ceil(totalUsers / limit); // Umumiy sahifalar soni

        res.status(200).json({
            users,
            page,
            totalPages,
            totalUsers,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Foydalanuvchini o'chirish
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        res.status(200).json({ message: "Foydalanuvchi muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Ro'yxatdan o'tgan foydalanuvchilar sonini olish
export const getUserCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ userCount });
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Yaratilgan savollar sonini olish
export const getQuizzCount = async (req, res) => {
    try {
        const quizzCount = await Quizz.countDocuments();
        res.status(200).json({ quizzCount });
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};

// Savolni (quizz) tahrirlash
export const editQuizz = async (req, res) => {
    try {
        const quizzId = req.params.id;
        const { title, description, questions } = req.body;

        const quizz = await Quizz.findById(quizzId);
        if (!quizz) {
            return res.status(404).json({ message: "Quizz topilmadi" });
        }

        quizz.title = title || quizz.title;
        quizz.description = description || quizz.description;
        quizz.questions = questions || quizz.questions;

        await quizz.save();
        res.status(200).json({ message: "Quizz muvaffaqiyatli tahrirlandi", quizz });
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};