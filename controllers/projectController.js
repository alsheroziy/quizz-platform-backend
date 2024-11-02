import Project from '../models/projects.js';
import User from '../models/user.js';

// Loyiha yaratish
export const createProject = async (req, res) => {
    const { name, description, image, code, url } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        const project = new Project({
            name,
            description, // Tavsif qo'shildi
            creator: user._id,
            creatorImage: user.image,
            image,
            code,
            url,
        });

        await project.save();
        res.status(201).json({ message: "Loyiha muvaffaqiyatli qo'shildi", project });
    } catch (error) {
        res.status(400).json({ message: "Loyiha yaratishda xato", error: error.message });
    }
};

// Barcha loyihalarni olish
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('creator', 'username');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Loyihalarni olishda xato", error: error.message });
    }
};

// Loyiha uchun like qo'shish
export const likeProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
        if (!project) {
            return res.status(404).json({ message: "Loyiha topilmadi" });
        }
        res.status(200).json({ message: "Like bosildi", project });
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
    }
};

// Loyiha uchun dislike qo'shish
export const dislikeProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true });
        if (!project) {
            return res.status(404).json({ message: "Loyiha topilmadi" });
        }
        res.status(200).json({ message: "Dislike bosildi", project });
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
    }
};

// Loyihaga izoh qo'shish
export const addComment = async (req, res) => {
    const { comment } = req.body;

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Loyiha topilmadi" });
        }

        project.comments.push({
            userId: req.user.id,
            comment,
        });

        await project.save();
        res.status(201).json({ message: "Izoh qo'shildi", project });
    } catch (error) {
        res.status(500).json({ message: "Izoh qo'shishda xato", error: error.message });
    }
};

// Loyihaga qo'shilgan izohlarni olish
export const getComments = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('comments.userId', 'username');
        if (!project) {
            return res.status(404).json({ message: "Loyiha topilmadi" });
        }

        res.status(200).json({ comments: project.comments });
    } catch (error) {
        res.status(500).json({ message: "Izohlarni olishda xato", error: error.message });
    }
};

// Eng ko'p like va ko'rishga ega foydalanuvchilarni olish
export const getTopUsers = async (req, res) => {
    try {
        // Foydalanuvchilarni like soni bo'yicha topish
        const topLikedUsers = await Project.aggregate([
            { $group: { _id: "$creator", totalLikes: { $sum: "$likes" } } },
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
            { $unwind: "$user" },
            { $sort: { totalLikes: -1 } },
            { $limit: 1 } // Eng ko'p like olgan foydalanuvchi
        ]);

        // Foydalanuvchilarni ko'rish soni bo'yicha topish
        const topViewedUsers = await Project.aggregate([
            { $group: { _id: "$creator", totalViews: { $sum: "$views" } } },
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
            { $unwind: "$user" },
            { $sort: { totalViews: -1 } },
            { $limit: 1 } // Eng ko'p ko'rilgan foydalanuvchi
        ]);

        res.status(200).json({ topLikedUsers, topViewedUsers });
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi", error: error.message });
    }
};