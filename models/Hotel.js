import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    hotelName:{
        type: String,
        required: true,
    },
    hotelType:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    pricePerNight:{
        type: Number,
        required: true,
    },
    amenities:[{type: String}],
    email:{type: String, required: true},
    phone:{type: String, required: true},
     imageURL: {
             type: String,
             required: true
         }, // main image
         images: [{
             type: String
         }],
    //Location auto later using API
    location:{
        lat: {type: Number, default: null},
        lng: {type: Number, default: null}
    },

    //rating dummy, later updated by the user input
    rating:{
        type: Number,
        default: 4.0,
    },
}, {timestamps: true});

export default mongoose.model('Hotel', hotelSchema);