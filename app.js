// app.js

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import quizzRoutes from './routes/quizz.js';
import commentRoutes from './routes/comments.js';
import rankingRoutes from './routes/rankings.js';
import projectRoutes from './routes/project.js';
import taskRoutes from './routes/task.js';
import submissionRoutes from './routes/submission.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
// CORS konfiguratsiyasi - barcha domenlarga ruxsat berish
app.use(cors());

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

// Loyiha marshrutlarini ulash
app.use('/api/projects', projectRoutes);

// Vazifalar marshrutlarini ulash
app.use('/api/tasks', taskRoutes);

// Yuborishlar marshrutlarini ulash
app.use('/api/submissions', submissionRoutes);

// Foydalanuvchi marshrutlarini ulash
app.use('/api/user', userRoutes);

// Admin marshrutlarini ulash
app.use('/api/admin', adminRoutes);

// Serverni ishga tushirish
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti`);
});