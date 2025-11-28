import express from 'express';
import { getPlaces, addPlace } from '../controllers/placeController.js';

const router = express.Router();

//GET places with optional filters
router.get('/', getPlaces);

//POST (add new places)
router.post('/', addPlace);

export default router;
