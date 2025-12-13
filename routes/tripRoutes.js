import express from 'express';
// import { getTripData } from '../controllers/tripController.js';
import { generateTripPlan } from '../controllers/tripController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

//POST /api/generate-plan
router.post('/generate-trip', auth, generateTripPlan);

export default router;