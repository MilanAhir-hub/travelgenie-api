import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    role:{
        type: String,
        default: "user" //we will add admin letter direct in mongodb
    }
});

export default mongoose.model("User", userSchema);