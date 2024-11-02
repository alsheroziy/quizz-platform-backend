// controllers/rankingController.js
import Submission from '../models/submission.js';
import User from '../models/user.js';

// Agar avvalgi reyting funksiyasi mavjud bo'lsa, uni saqlab qolishingiz mumkin
// export const getTopUsers = ...

// Eng ko'p savollarga javob bergan foydalanuvchilarni olish
export const getTopUsersByQuestionsAnswered = async (req, res) => {
    try {
        // Foydalanuvchilarni umumiy javob bergan savollar soni bo'yicha tartiblaymiz
        const topUsers = await Submission.aggregate([
            {
                $group: {
                    _id: "$user",
                    totalQuestionsAnswered: { $sum: "$totalQuestions" },
                    submissions: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 1,
                    totalQuestionsAnswered: 1,
                    submissions: 1,
                    "user.firstname": 1,
                    "user.lastname": 1,
                    "user.username": 1
                }
            },
            { $sort: { totalQuestionsAnswered: -1 } }
        ]);

        res.status(200).json({ topUsers });
    } catch (err) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
    }
};