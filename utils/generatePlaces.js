import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import connectDB from '../config/db.js';
import Place from '../models/Place.js';
import {placeImagesByCity} from '../data/placeImages.js';

dotenv.config();
connectDB();

const generatePlaces = async () => {
    const cities = Object.keys(placeImagesByCity);
    const categories = ["Nature", "Adventure", "Spiritual", "Heritage", "Culture", "Beach"];

    const places = [];

    for (let city of cities) {
        for (let i = 0; i < 3; i++) { 
            places.push({
                placeName: faker.location.streetAddress(), // random but looks real
                city,
                country: "India",
                category: faker.helpers.arrayElement(categories),
                description: faker.lorem.paragraph(2),
                entryFee: faker.number.int({
                    min: 0,
                    max: 10
                })*50,
                bestTimeToVisit: faker.helpers.arrayElement([
                    "Summer", "Winter", "Monsoon", "Spring", "All Seasons"
                ]),
                openingHours: faker.helpers.arrayElement([
                    "9:00 AM - 6:00 PM",
                    "6:00 AM - 6:00 PM",
                    "Open 24 Hours",
                    "8:00 AM - 5:00 PM",
                ]),

                imageURL: faker.helpers.arrayElement(placeImagesByCity[city]), // actual city-based images

                rating: faker.number.float({
                    min: 3.5,
                    max: 5,
                    precision: 0.1
                }).toFixed(1),
            });
        }
    }

    await Place.insertMany(places);
    console.log("Dummy places inserted successfully");
    mongoose.connection.close();
};

generatePlaces();