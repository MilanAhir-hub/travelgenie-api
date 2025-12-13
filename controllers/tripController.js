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

//planning whole trip from the gemini
import { masterPrompt } from "../services/promptBuilder.js";
import { getGeminiResponse } from "../services/geminiService.js";

export async function generateTripPlan(req, res){
    try {
        //build backend json by weather+cost+db data

        const tripData = await buildTripData(req.body);

        //now let create the ai prompt using the trip data
        const prompt = await masterPrompt(tripData);

        //now get the gemini ai response
        const aiResponse = await getGeminiResponse(prompt);

        //parse the json
        let finalPlan;
        try {
            finalPlan = JSON.parse(aiResponse);
        } catch (jsonError) {
             console.error("JSON Parse Error:", jsonError);
             console.log("Raw AI Response:", aiResponse); // Log raw for debugging
             throw new Error("Failed to parse AI response into JSON");
        }

        res.status(200).json({
            success: true,
            trip: finalPlan,
            hotels: tripData.hotels // Send the real hotels from DB
        });
    } catch (error) {
        console.log("Error at tripController.js");
        res.status(500).json({
            success: false,
            error: error.message || "Failed to generate the trip plan"
        });
    }
}