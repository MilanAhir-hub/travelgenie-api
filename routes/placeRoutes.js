import express from 'express';
import { getPlaces, addPlace } from '../controllers/placeController.js';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

//GET places with optional filters
router.get('/', getPlaces);

//POST (add new places) this can be dont by only the admin
router.post('/',auth, authorize("admin"), addPlace);

export default router;
