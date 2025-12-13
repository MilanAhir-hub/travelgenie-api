import express from 'express';
import { getWeather } from '../services/weatherService.js';

const router = express.Router();

router.get('/', async(req, res)=>{
    try {
        const {
            destination
        } = req.query;

        if (!destination) {
            return res.status(400).json({
                message: "Destination required"
            });
        }

        const weather = await getWeather(destination);
        res.status(200).json(weather);
    } catch (error) {
        res.status(500).json({message: "Error while fetching weather data", error: error.message});
        console.log(error);
    }
});

export default router;