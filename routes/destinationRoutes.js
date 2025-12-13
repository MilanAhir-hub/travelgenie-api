import express from 'express';
import { availableHotels } from '../controllers/destinationController.js';

const router = express.Router();

router.get('/', availableHotels);

export default router;
