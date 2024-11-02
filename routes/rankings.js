// routes/rankings.js
import express from 'express';
import * as rankingController from '../controllers/rankingController.js';

const router = express.Router();

// Agar avvalgi reyting marshruti mavjud bo'lsa, uni saqlab qolamiz
// router.get('/top-users', rankingController.getTopUsers);

// Eng ko'p savollarga javob bergan foydalanuvchilar (savollar soni bo'yicha)
router.get('/top-users', rankingController.getTopUsersByQuestionsAnswered);

export default router;