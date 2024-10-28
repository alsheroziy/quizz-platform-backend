import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import quizzRoutes from './routes/quizz.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Connect the auth route
app.use('/auth', authRoutes);

// Quizz marshrutini ulash
app.use('/api/quizz', quizzRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti`);
});
