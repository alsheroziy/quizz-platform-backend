import Submission from '../models/submission.js';
import Task from '../models/task.js';

// Foydalanuvchi vazifaga javob topshirishi
export const submitTaskResponse = async (req, res) => {
    const { taskId } = req.params;
    const { link } = req.body;
    const file = req.file ? req.file.path : null; // Agar fayl bo'lsa, uni qo'shish

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Vazifa topilmadi' });
        }

        const submission = new Submission({
            task: taskId,
            user: req.user.id,
            file,
            link
        });

        await submission.save();
        res.status(201).json({ message: 'Javob muvaffaqiyatli topshirildi', submission });
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

// Admin tomonidan javobni baholash
export const reviewSubmission = async (req, res) => {
    const { submissionId } = req.params;
    const { status, feedback } = req.body;

    try {
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: 'Javob topilmadi' });
        }

        submission.status = status;
        submission.feedback = feedback;
        await submission.save();

        res.status(200).json({ message: 'Javob baholandi', submission });
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};