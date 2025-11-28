import express from 'express';
import { getHotels, addHotel } from '../controllers/hotelController.js';

const router = express.Router();

// GET /api/hotels with filters like city, pricce, rating etc.

router.get('/', getHotels);

//POST /api/hotels for owners add new hotel
router.post('/', addHotel);

export default router;