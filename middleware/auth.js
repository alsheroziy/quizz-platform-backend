// middleware/auth.js
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: "Token topilmadi" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Token ichidagi foydalanuvchi ma'lumotlarini qo'shamiz
        next();
    } catch (err) {
        res.status(400).json({ message: "Noto'g'ri token", error: err.message });
    }
};