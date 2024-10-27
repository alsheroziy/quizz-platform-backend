const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const quizzRoutes = require('./routes/quizz');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB bilan ulanish
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDBga ulanish muvaffaqiyatli'))
.catch(err => console.error('MongoDBga ulanishda xato:', err));

// Auth routerini ulash
app.use('/auth', authRoutes);

// Quizz routerini ulash
app.use('/api/quizz', quizzRoutes);

// Serverni ishga tushirish
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti`);
});
