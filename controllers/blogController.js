// controllers/blogController.js
import Blog from '../models/blog.js';

// Blog yaratish (faqat admin uchun)
export const createBlog = async (req, res) => {
    const { title, description, image } = req.body;

    // Faqat adminlar ruxsatini tekshirish
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Faqat adminlar blog yaratishi mumkin" });
    }

    try {
        const blog = new Blog({
            title,
            description,
            image: image || null,
            createdBy: req.user.id
        });

        await blog.save();
        res.status(201).json({ message: "Blog muvaffaqiyatli yaratildi", blog });
    } catch (error) {
        res.status(500).json({ message: "Blog yaratishda xatolik", error: error.message });
    }
};

// Barcha bloglarni olish
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('createdBy', 'username');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Bloglarni olishda xatolik", error: error.message });
    }
};

// ID bo'yicha blog olish
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('createdBy', 'username');
        if (!blog) {
            return res.status(404).json({ message: "Blog topilmadi" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Blogni olishda xatolik", error: error.message });
    }
};

// Blogni yangilash
export const updateBlog = async (req, res) => {
    const { title, description, image } = req.body;

    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog topilmadi" });
        }

        if (blog.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Bu blogni tahrirlash uchun ruxsat yo'q" });
        }

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.image = image || blog.image;

        await blog.save();
        res.status(200).json({ message: "Blog muvaffaqiyatli yangilandi", blog });
    } catch (error) {
        res.status(500).json({ message: "Blogni yangilashda xatolik", error: error.message });
    }
};

// Blogni o'chirish
export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        
        // Blogni topib va o'chirish
        const blog = await Blog.findByIdAndDelete(blogId);
        
        if (!blog) {
            return res.status(404).json({ message: "Blog topilmadi" });
        }

        res.status(200).json({ message: "Blog muvaffaqiyatli o'chirildi" });
    } catch (error) {
        res.status(500).json({ message: "Blogni o'chirishda xatolik", error: error.message });
    }
};