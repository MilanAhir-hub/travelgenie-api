import User from "../../models/User.js";
import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken";

export const register = async(req, res) =>{
   try {
     const {
         name,
         email,
         password
     } = req.body;

     const existingUser = await User.findOne({
         email
     });

     if (existingUser) {
         return res.json({
             message: "User already exists"
         });
     }

     const hashedPassword = await bcrypt.hash(password, 10);

     const user = await User.create({
         name,
         email,
         password: hashedPassword,
         role: "user"
     });

     res.json({
         message: "User registered successfully",
         user
     });
   } catch (error) {
    console.log("Error while register: ", error.message);
    return res.status(500).json({message: "Error while registering the user"});
   }
}

export const login = async(req, res) =>{
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.json({
                message: "User not found!"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log("Error while login: ", error.message);
        return res.json({message: "Login failed!"});
    }
}