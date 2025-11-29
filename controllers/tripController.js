import {
    buildTripData
} from "../services/tripDataBuilder.js";

export async function getTripData(req, res) {
    try {
        const userInput = req.body;

        const finalTripData = await buildTripData(userInput);

        res.status(200).json({
            success: true,
            message: "Trip data prepared successfully",
            data: finalTripData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error building trip data",
            error: error.message
        });
    }
}