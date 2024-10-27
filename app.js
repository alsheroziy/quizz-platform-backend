import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import quizzRoutes from './routes/quizz.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDBga ulanish muvaffaqiyatli'))
.catch(err => console.error('MongoDBga ulanishda xato:', err));

// Connect the auth router
app.use('/auth', authRoutes);

// Connect the Quizz router
app.use('/api/quizz', quizzRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti`);
});
