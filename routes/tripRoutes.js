import express from 'express';
// import { getTripData } from '../controllers/tripController.js';
import { generateTripPlan } from '../controllers/tripController.js';

const router = express.Router();

//POST /api/trip-plan
router.post('/generate-plan', generateTripPlan);

export default router;