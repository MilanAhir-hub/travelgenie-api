import { uploadToCloudinary } from "../../services/uploadService.js";

export const uploadImage = async(req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({message: "No file uploaded"});
        }

        //now let upload the image to the cloudinary
        const result = await uploadToCloudinary(req.file.path, {
            folder: "myapp",
            quality: "auto",
            fetch_format: "auto"
        });


        return res.json({
            url: result.secure_url,
            public_id: result.public_id
        })
    } catch (error) {
        return res.status(500).json({message: "Error in uploadImage", error: error.message});
    }
}