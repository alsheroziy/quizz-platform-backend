import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDBga ulanish muvaffaqiyatli');
    } catch (err) {
        console.error('MongoDBga ulanishda xato:', err);
        process.exit(1); // The program stops when an error occurs
    }
};

export default connectDB;
