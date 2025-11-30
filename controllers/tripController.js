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

        //parse the json because the data from the gemini is in the json format and we have to convert it into the string format

        const finalPlan = JSON.parse(aiResponse);

        res.status(200).json({
            success: true,
            trip_plan: finalPlan
        });
    } catch (error) {
        console.log("Error at tripController.js");
        res.status(500).json({
            success: false,
            error: error.message || "Failed to generate the trip plan"
        });
    }
}