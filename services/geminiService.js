import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function cleanAIResponse(text) {
    return text
        .replace(/```json/gi, "") // remove ```json
        .replace(/```/g, "") // remove ```
        .replace(/^[\s\n]+|[\s\n]+$/g, "") // trim spaces/newlines
        .trim();
}

export async function getGeminiResponse(prompt){
    try {
        const model = genAI.getGenerativeModel({model: "gemini-pro-latest"});

        const result = await model.generateContent(prompt);

        let aiText = result.response.text();

        //clean ai response
        aiText = cleanAIResponse(aiText);

        return aiText;
    } catch (error) {
        console.error("Gemini API error: ", error.message);
        throw new Error("Failed to fetch the response from the gemini");
    }
}

/*import {
    GoogleGenerativeAI
}
from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// Load API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiResponse(prompt) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-pro-latest" // fixed model name
        });

        const result = await model.generateContent(prompt);
        console.log(result.response.text());

        return result.response.text(); // correct response format
    } catch (error) {
        console.error("Gemini API error:", error);
        throw new Error("Failed to fetch response from Gemini");
    }
}

const prompt = "5 lines about india"
getGeminiResponse(prompt);
*/