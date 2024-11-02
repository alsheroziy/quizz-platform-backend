// models/submission.js
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quizz', required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    answers: { type: Map, of: String }, // { questionId: answer }
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);