import jwt from 'jsonwebtoken';

export const auth = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.json({message: "Not token provided!"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.json({message: "Invalid token"});
    }
};