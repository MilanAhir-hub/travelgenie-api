import express from 'express';
import { getTripData } from '../controllers/tripController.js';


const router = express.Router();

//POST /api/trip-plan
router.post('/plan', getTripData);

export default router;