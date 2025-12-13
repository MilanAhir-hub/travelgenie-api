import Hotel from '../models/Hotel.js'; 

export const availableHotels = async(req, res) =>{
    try {
        const destinations = await Hotel.distinct('city');
         console.log('Available destinations: ', destinations);
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json(error);
    }
   
}


