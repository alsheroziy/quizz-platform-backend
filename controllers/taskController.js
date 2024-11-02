import Task from '../models/task.js';

// Vazifa yaratish
export const createTask = async (req, res) => {
    const { title, description, image, link, assignedUsers } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title majburiy' });
    }

    try {
        const task = new Task({
            title,
            description,
            image,
            link,
            createdBy: req.user.id,
            assignedUsers: assignedUsers || [] // Agar tanlangan foydalanuvchilar bo'lmasa, bo'sh ro'yxat
        });

        await task.save();
        res.status(201).json({ message: 'Vazifa yaratildi', task });
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

// Foydalanuvchi uchun mavjud vazifalarni olish
export const getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            assignedUsers: req.user.id // Faqat foydalanuvchiga tayinlangan vazifalarni olish
        }).populate('createdBy', 'firstname lastname');

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Vazifalarni olishda xatolik yuz berdi', error: error.message });
    }
};