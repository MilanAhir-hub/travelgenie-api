import express from 'express';
import upload from '../middleware/upload.js';
import { uploadImage } from '../controllers/storage/upload.controller.js';

const router = express.Router();


router.post('/', upload.single('file'), uploadImage);

export default router;