import mongoose from 'mongoose'; //because mongodb cant see the schema and happily store garbage into it
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import Hotel from '../models/Hotel.js';
import connectDB from '../config/db.js';
import { hotelImages } from '../data/hotelImages.js';

dotenv.config();

connectDB();

const generateHotels = async() =>{
    const hotels = [];
    const cities = [
        'Delhi',
        'Mumbai',
        'Bengaluru',
        'Chennai',
        'Kolkata',
        'Hyderabad',
        'Jaipur',
        'Goa',
        'Agra',
        'Varanasi',
        'Udaipur',
        'Pune',
        'Ahmedabad',
        'Kochi',
        'Shimla',
        'Manali',
        'Rishikesh',
        'Amritsar',
        'Darjeeling',
        'Mysuru'
    ];

    const amenities = [
        'Wifi','Pool', 'Parking', 'Breakfast', 'AC', 'Spa'
    ];

    for(let i = 0; i<500; i++){
        const city = faker.helpers.arrayElement(cities);

        hotels.push({
            hotelName: faker.company.name(),
            hotelType: faker.helpers.arrayElement([
                'Hotel',
                'Resort',
                'Villa',
                'Cottage',
                'Hostel',
                'Boutique Hotel',
                'Homestay',
                'Guest House',
                'Luxury Suite',
                'Business Hotel'
            ]),
            city,
            country: 'India',
            address: faker.location.streetAddress(),
            pricePerNight: faker.number.int({min: 1500, max: 9000}),
            amenities: faker.helpers.arrayElements(amenities, faker.number.int({min: 2, max: 5})),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            imageURL: faker.helpers.arrayElement(hotelImages),
            rating: faker.number.float({min: 3, max: 5, precision: 0.1}), //round of around one decimal number
        });
    }

    await Hotel.insertMany(hotels);
    console.log('Dummy hotels inserted successfully');
    mongoose.connection.close();
};

generateHotels();