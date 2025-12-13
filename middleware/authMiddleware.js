import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.json({
            message: "No token provided!"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //fetch user from DB so we have role also
        const user = await User.findOne({_id: decoded.userId}).select("-password");

        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.json({
            message: "Invalid token"
        });
    }
};

// let add authorize middleware which is checking the role of the user

export const authorize = (...roles) =>{  //here roles = ["user"] or ["user" or "admin"];
    return (req, res, next) =>{
        if(!req.user){
            return res.json({message: "No user data in request!"});
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "Access denied!"});
        }

        next();
    }
}