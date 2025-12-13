// routes/hotelRoutes.js

import express from "express";
import multer from "multer";
import {
    uploadHotel
} from "../controllers/uploadHotel.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();
const upload = multer({
    dest: "uploads/"
});


// =========================
// POST → Create Hotel
// Supports: images + URLs
// =========================
router.post(
    "/",
    upload.array("images", 4), // max 4 images
    uploadHotel
);


// =========================
// GET → All Hotels
// =========================
// GET → Paginated Hotels (Infinite Scroll Support)
router.get("/", async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;

        const hotels = await Hotel.find()
            .sort({
                createdAt: -1
            })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Hotel.countDocuments();

        res.json({
            hotels,
            hasMore: page * limit < total
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching hotels"
        });
    }
});



// =========================
// GET → Single Hotel
// =========================
router.get("/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                message: "Hotel not found"
            });
        }

        res.json(hotel);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching hotel"
        });
    }
});


export default router;
