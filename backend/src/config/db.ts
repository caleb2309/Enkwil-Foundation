import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            // Throw an error if the connection string is not defined
            throw new Error('MONGO_URI is not defined in the environment variables');
        }
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        // Log the error and exit the process if connection fails
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
