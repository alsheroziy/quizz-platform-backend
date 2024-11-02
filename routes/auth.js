// routes/auth.js
import express from 'express';
import { register, login, adminRegister } from '../controllers/authController.js';

const router = express.Router();

// Foydalanuvchini ro'yxatdan o'tkazish
router.post('/register', register);

// Foydalanuvchini tizimga kiritish
router.post('/login', login);

// Adminni ro'yxatdan o'tkazish
router.post('/admin', adminRegister);

export default router;