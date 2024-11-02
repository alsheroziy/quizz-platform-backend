// models/user.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    device: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    lastAccessed: {
        type: Date,
        default: Date.now,
    },
});

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    image: {
        type: String,
        default: null,
    },
    sessions: [sessionSchema], // Kirish tarixi va qurilma ma'lumotlarini saqlash
}, { timestamps: true });

export default mongoose.model('User', UserSchema);