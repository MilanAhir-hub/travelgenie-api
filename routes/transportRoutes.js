import express from 'express';
import { getCoordinatesByCity, getDistanceKm, calculateTransportCost } from '../services/distanceService.js';
const router = express.Router();

//GET /api/transport/cost?from=Rajkot&to=Manali&type=train
router.get('/cost', async(req, res) =>{
    try {
        const {from, to, type} = req.query;

        if(!from || !to || !type){
            res.status(400).json({message: "From, to and types are required"});
        }

        const start = await getCoordinatesByCity(from);
        const end = await getCoordinatesByCity(to);

        const distanceKm = await getDistanceKm(start, end);

        const cost = calculateTransportCost(distanceKm, type);

        res.json({
            from,
            to,
            transportType: type,
            distanceKm,
            cost
        });
    } catch (error) {
        res.status(500).json({message: "Error calculating transport cost"});
    }
});

export default router;