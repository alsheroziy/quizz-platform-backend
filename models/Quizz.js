// models/quizz.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
});

const quizzSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    questions: [questionSchema],
    timeLimit: { // Yangi maydon - vaqt limiti (sekundlarda)
        type: Number,
        default: null, // Agar vaqt limiti yo'q bo'lsa, null bo'ladi
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, required: true },
        adminReply: { type: String, default: null }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Quizz', quizzSchema);