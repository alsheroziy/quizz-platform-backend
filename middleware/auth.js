const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send("Token topilmadi");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Token ichidan foydalanuvchi ma'lumotlarini qo'shamiz
        next();
    } catch (err) {
        res.status(400).send("Noto'g'ri token");
    }
};
