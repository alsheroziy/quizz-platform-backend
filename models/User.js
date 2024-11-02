// models/user.js

import mongoose from 'mongoose';

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
        default: 'user', // Foydalanuvchining standart roli
        enum: ['user', 'admin'], // Faqat 'user' yoki 'admin' qabul qiladi
    },
}, { timestamps: true }); // timestamps qo'shilishi bilan 'createdAt' va 'updatedAt' maydonlari avtomatik ravishda saqlanadi

export default mongoose.model('User', UserSchema);