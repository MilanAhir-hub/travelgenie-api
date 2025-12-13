import axios from 'axios';

const ORS_API_KEY = process.env.ORS_API_KEY;

// let get coordinates from the city name
export async function getCoordinatesByCity(cityName){
    const url = "https://api.openrouteservice.org/geocode/search";

    try {
        const res = await axios.get(url, {
            params: {
                api_key: ORS_API_KEY,
                text: cityName,
                size: 1
            }
        });

        const feature = res.data.features?.[0];

        if(!feature){
            throw new Error("No location found for city name: "+ cityName);
        }

        const [lon, lat] = feature.geometry.coordinates;

        return {lon, lat};
    } catch (error) {
        console.log("Error in hetCoordinatesByCity", error.message);
        throw error;
    }
}

//let get distance in the km using coordinates
export async function getDistanceKm(startCoords, endCoords){
    const {lon: startLon, lat: startLat} = startCoords;
    const {lon: endLon, lat: endLat} = endCoords;

    const url = "https://api.openrouteservice.org/v2/directions/driving-car";

    try {
        const res = await axios.get(url, {
            params: {
                api_key: ORS_API_KEY,
                start: `${startLon}, ${startLat}`,
                end: `${endLon}, ${endLat}`
            }
        });

        const summary = res.data.features?.[0]?.properties?.summary;

        if(!summary){
            throw new Error("No route summary found");
        }

        const distanceMeters = summary.distance;

        const distanceKm = distanceMeters/1000;

        return Number(distanceKm.toFixed(2)); //e.g. 1380.55
    } catch (error) {
        console.log("Error in getDistanceKm: "+error.message);
        throw error;
    }
}

//let calculate transportation cost
export function calculateTransportCost(distanceKm, transportType){
    const ratesPerKm = {
        bus: 3,
        shared_cab: 7, 
        private_taxi: 12,
        train: 4,
        flight: 17
    };

    const rate = ratesPerKm[transportType];

    if(!rate){
        throw new Error("Unknown transportType: "+ transportType);
    }

    const cost = distanceKm*rate;
    return Math.round(cost);
}