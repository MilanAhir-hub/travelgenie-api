import HeroMedia from "../models/HeroMedia.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/uploadService.js";

export const uploadHeroMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        // Detect type automatically from mimetype
        const isVideo = req.file.mimetype.startsWith("video");
        const uploadOptions = {
            folder: "planmytrip/hero",
            resource_type: isVideo ? "video" : "image",
        };

        // Upload to Cloudinary using service
        const result = await uploadToCloudinary(req.file.path, uploadOptions);

        // Delete old media (Hero should always have only 1 media)
        const old = await HeroMedia.findOne();
        if (old) {
            await deleteFromCloudinary(old.publicId, {
                resource_type: old.type === "video" ? "video" : "image",
            });
            await HeroMedia.findByIdAndDelete(old._id);
        }

        // Save new media
        const saved = await HeroMedia.create({
            type: isVideo ? "video" : "image",
            url: result.secure_url,
            publicId: result.public_id,
        });

        res.json({
            message: "Hero media updated successfully",
            media: saved,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error in uploadHeroMedia",
            error: error.message,
        });
    }
};

export const getHeroMedia = async (req, res) => {
    try {
        const media = await HeroMedia.findOne().sort({
            createdAt: -1
        });

        if (!media) {
            return res.status(404).json({
                message: "No hero media found"
            });
        }

        res.json(media);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching hero media",
            error: error.message,
        });
    }
};

