import express from "express";
import upload from "../middleware/upload.js";
import {
    getHeroMedia,
    uploadHeroMedia
} from "../controllers/heroController.js";

const router = express.Router();

// Upload Image or Video for Hero Section
router.post("/upload", upload.single("file"), uploadHeroMedia);

router.get("/", getHeroMedia);

export default router;
