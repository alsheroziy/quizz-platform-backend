import Project from '../models/projects.js';

// Loyiha yaratish
export const createProject = async (req, res) => {
    const { name, image, code, url } = req.body;

    try {
        const project = new Project({
            name,
            creator: req.user.id, // Foydalanuvchining ID si avtomatik olinyapti
            image,
            code,
            url
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