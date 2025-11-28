import Place from "../models/Place.js";

// GET places with filters like city or category

export const getPlaces = async(req, res)=>{
    try {
        const {city, category} = req.query;

        const filter = {};
        if(city !== undefined){
            filter.city = city;
        }

        if(category !== undefined){
            filter.category = category;
        }

        const places = await Place.find(filter);
        res.json(places);
    } catch (error) {
        res.status(500).json({message: "Internal serveer error"});
    }
}

//POST (add new place)

export const addPlace = async(req, res)=>{
    try {
        const place = new Place(req.body);
        await place.save();
        res.status(201).json(place);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}