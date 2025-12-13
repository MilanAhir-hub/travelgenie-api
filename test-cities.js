import mongoose from 'mongoose';
import Hotel from './models/Hotel.js';
import dotenv from 'dotenv';
dotenv.config();

const testCities = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is undefined in .env");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
        
        const cities = await Hotel.distinct('city');
        console.log('Available cities:', cities);
        
        process.exit();
    } catch (err) {
        console.error("Test failed:", err);
        process.exit(1);
    }
};

testCities();
