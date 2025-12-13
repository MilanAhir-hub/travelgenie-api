// controllers/uploadHotel.js

import Hotel from "../models/Hotel.js";
import { uploadToCloudinary } from "../services/uploadService.js";

export const uploadHotel = async (req, res) => {
    try {
        let finalImages = [];

        // -------------------------------
        // 1. Handle image URLs (optional)
        // -------------------------------
        let urlImages = [];

        if (req.body.imageURLs) {
            urlImages = Array.isArray(req.body.imageURLs) ?
                req.body.imageURLs :
                [req.body.imageURLs];
        }

        // -------------------------------
        // 2. Handle local file uploads
        // -------------------------------
        let uploadedFiles = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.path, {
                    folder: "hotels",
                });
                uploadedFiles.push(result.secure_url);
            }
        }

        // -------------------------------
        // 3. Combine URLs + Uploaded files
        // -------------------------------
        finalImages = [...urlImages, ...uploadedFiles];

        // Max 4 images rule
        if (finalImages.length === 0) {
            return res.status(400).json({
                message: "At least 1 image required"
            });
        }

        if (finalImages.length > 4) {
            return res
                .status(400)
                .json({
                    message: "Maximum 4 images allowed (URL + uploaded)"
                });
        }

        // -------------------------------
        // 4. Create hotel
        // -------------------------------
        const hotel = new Hotel({
            ...req.body,
            imageURL: finalImages[0], // main image
            images: finalImages, // add this
        });

        await hotel.save();

        res.status(201).json({
            message: "Hotel created successfully",
            hotel,
            images: finalImages,
        });
    } catch (error) {
        console.error("Hotel Upload Error:", error);
        res.status(500).json({
            message: "Error uploading hotel"
        });
    }
};
