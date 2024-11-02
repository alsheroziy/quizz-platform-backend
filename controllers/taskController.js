// controllers/taskController.js
import Task from '../models/task.js';
import TaskSubmission from '../models/taskSubmission.js';

// Vazifa yaratish
export const createTask = async (req, res) => {
    const { title, description, image, link, assignedUsers } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title maydoni majburiy' });
    }

    try {
        const task = new Task({
            title,
            description,
            image,
            link,
            assignedUsers,
            createdBy: req.user.id
        });

        await task.save();
        res.status(201).json({ message: 'Vazifa muvaffaqiyatli yaratildi', task });
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
    }
};

// Foydalanuvchining vazifalarini olish
export const getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedUsers: req.user.id })
                                .select('title description image link createdAt')
                                .sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Vazifalarni olishda xatolik yuz berdi", error: error.message });
    }
};

// Vazifa topshirig'ini yuborish
export const submitTask = async (req, res) => {
    const { taskId, link, zipFile } = req.body;

    if (!taskId) {
        return res.status(400).json({ message: 'Task ID majburiy' });
    }

    try {
        const taskSubmission = new TaskSubmission({
            userId: req.user.id,
            taskId,
            link,
            zipFile
        });

        await taskSubmission.save();
        res.status(201).json({ message: 'Vazifa yuborildi', taskSubmission });
    } catch (error) {
        res.status(500).json({ message: "Vazifani yuborishda xatolik yuz berdi", error: error.message });
    }
};

// Vazifa topshirig'ini ko'rib chiqish (admin tomonidan)
export const reviewTaskSubmission = async (req, res) => {
    const { submissionId } = req.params;
    const { status, feedback } = req.body;

    try {
        const submission = await TaskSubmission.findByIdAndUpdate(
            submissionId,
            { status, feedback },
            { new: true }
        );

        if (!submission) {
            return res.status(404).json({ message: "Vazifa topilmadi" });
        }

        res.status(200).json({ message: 'Vazifa tekshirildi', submission });
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
    }
};

// Foydalanuvchining yuborilgan topshiriqlarini olish
export const getUserSubmissions = async (req, res) => {
    try {
        const submissions = await TaskSubmission.find({ userId: req.user.id })
                                                .populate('taskId', 'title description')
                                                .sort({ submittedAt: -1 });

        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: "Topshiriqlarni olishda xatolik yuz berdi", error: error.message });
    }
};