import { getCoordinatesByCity, getDistanceKm, calculateTransportCost } from "./distanceService.js";

import { getWeather } from "./whetherService.js";
import Hotel from "../models/Hotel.js";
import Place from "../models/Place.js";

export async function buildTripData(userInput){
    const {destination, days, budget, tripType, compromisePriority, startCity, transportType} = userInput;

    //let get weather details from weather api
    const weatherData = await getWeather(destination);

    //let get transport cost
    const startCoords = await getCoordinatesByCity(startCity);

    const endCoords = await getCoordinatesByCity(destination);

    const distanceKm = await getDistanceKm(startCoords, endCoords);

    const transportCost = calculateTransportCost(distanceKm, transportType);

    //let get places and hotels from the database
    const places = await Place.find({city: destination}).limit(3);
    const hotels = await Hotel.find({city: destination});

    const selectedHotel = hotels.find(h => h.type === tripType) || hotels[0];

    const stayCost = selectedHotel?.pricePerNight*days || 0;

    //let build final structure for gemini in json format
    return{
        user_preferences: {
            destination,
            startCity,
            days,
            budget,
            tripType,
            compromisePriority,
            transportType
        },
        transport: {
            distanceKm,
            transportCost,
            type: transportType
        },
        stay: {
            hotel: selectedHotel?.hotelName,
            stayType: tripType,
            stayCost
        },
        places_to_visit: places.map(p =>({
            name: p.placeName,
            category: p.category,
            description: p.description
        })),
        weather: weatherData
    }
}