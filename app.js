// app.js

import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import quizzRoutes from './routes/quizz.js';
import commentRoutes from './routes/comments.js';
import rankingRoutes from './routes/rankings.js';
import adminRoutes from './routes/admin.js'; // Admin marshrutlarini import qilamiz

dotenv.config();

const app = express();
app.use(express.json());

// Ma'lumotlar bazasiga ulanish
connectDB();

// Auth marshrutlarini ulash
app.use('/auth', authRoutes);

// Quizz marshrutlarini ulash
app.use('/api/quizz', quizzRoutes);

// Komment marshrutlarini ulash
app.use('/api/comments', commentRoutes);

// Reyting marshrutlarini ulash
app.use('/api/rankings', rankingRoutes);

// Admin marshrutlarini ulash
app.use('/api/admin', adminRoutes);

// Serverni ishga tushirish
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti`);
});