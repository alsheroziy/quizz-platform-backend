const express = require('express');
const { register, login, adminRegister } = require('../controllers/authController');
const router = express.Router();

// Foydalanuvchi ro'yxatdan o'tish
router.post('/register', register);

// Foydalanuvchi login qilish
router.post('/login', login);

// Adminni ro'yxatdan o'tkazish
router.post('/admin', adminRegister);

module.exports = router;
