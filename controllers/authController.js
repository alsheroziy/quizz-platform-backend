const User = require('../models/User');
const bcrypt = require('bcryptjs'); // bcryptjs dan foydalanish
const jwt = require('jsonwebtoken');

// Foydalanuvchini ro'yxatdan o'tkazish
exports.register = async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword,
            role: 'user', // Foydalanuvchini standart roli
        });

        await newUser.save();
        res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi' });
    } catch (error) {
        res.status(400).json({ message: 'Ro\'yxatdan o\'tishda xato', error: error.message });
    }
};

// Foydalanuvchini login qilish
exports.login = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Parol noto\'g\'ri' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
    }
};

// Adminni ro'yxatdan o'tkazish
exports.adminRegister = async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new User({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword,
            role: 'admin' // Admin rolini belgilash
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin muvaffaqiyatli ro\'yxatdan o\'tdi' });
    } catch (error) {
        res.status(400).json({ message: 'Ro\'yxatdan o\'tishda xato', error: error.message });
    }
};
