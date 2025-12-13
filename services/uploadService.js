import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * Uploads a file to Cloudinary and deletes the local temporary file.
 * @param {string} filePath - Path to the local file.
 * @param {object} options - Cloudinary upload options (folder, resource_type, etc.).
 * @returns {Promise<object>} - The Cloudinary upload result.
 */
export const uploadToCloudinary = async (filePath, options = {}) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, options);
        
        // Remove temp file
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return result;
    } catch (error) {
        // Ensure temp file is deleted even if upload fails
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        throw error;
    }
};

/**
 * Deletes a file from Cloudinary.
 * @param {string} publicId - The public ID of the asset.
 * @param {object} options - Options (resource_type, etc.).
 */
export const deleteFromCloudinary = async (publicId, options = {}) => {
    return await cloudinary.uploader.destroy(publicId, options);
};
