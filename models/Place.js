import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "India"
    },

    category:{
        type: String,
        enum: ["Nature", "Adventure", "Spiritual", "Heritage", "Culture", "Beach"],
        required: true,
    },

    description:{
        type: String,
        required: true
    },

    entryFee:{
        type: Number,
        default: 0
    },
    bestTimeToVisit:{
        type: String
    },
    openingHours:{
        type: String
    },
    imageURL:{
        type: String,
        required: true
    },

    rating:{
        type:Number,
        default: 4.2
    }
}, {timestamps: true});

export default mongoose.model("Place", placeSchema);