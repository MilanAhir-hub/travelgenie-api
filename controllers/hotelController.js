import Hotel from '../models/Hotel.js';

export const getHotels = async (req, res) => {
    try {
        const {city, minPrice, maxPrice, minRating} = req.query;

        //let build a filter object
        const filter = {};

        //city filter
        if(city && city.trim() !== ""){
            filter.city = city.trim();
        }
        
        //pricing filter
        if(minPrice!== undefined || maxPrice !== undefined){
            filter.pricePerNight = {};

            const minNum = Number(minPrice);
            const maxNum = Number(maxPrice);

            if(isNaN(minNum) === false){
                filter.pricePerNight.$gte = minNum;
            }

            if(isNaN(maxNum) === false){
                filter.pricePerNight.$lte = maxNum;
            }
        }

        //rating filter
        if(minRating !==undefined){
            const ratingNum = Number(minRating);
            if(isNaN(ratingNum) === false){
                filter.rating = { $gte: ratingNum}
            }
        }

        const hotels = await Hotel.find(filter);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

//Post(add) hotels
export const addHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500)
    }
}