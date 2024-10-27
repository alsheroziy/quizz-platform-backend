import mongoose from 'mongoose';

const quizzSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: [{
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
        likes: {
            type: Number,
            default: 0,
        },
        dislikes: {
            type: Number,
            default: 0,
        }
    }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, required: true },
        adminReply: { type: String, default: null }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Quizz', quizzSchema);
