import {
    GoogleGenerativeAI
} from "@google/generative-ai";

const ai = new GoogleGenerativeAI("AIzaSyCcSpadnlvdzGwJNoP9FdUqID6pvS2_KEY");

async function main() {
    const model = ai.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const response = await model.generateContent({
        contents: [{
            role: "user",
            parts: [{
                text: "Explain how AI works in a few words"
            }],
        }, ],
    });

    console.log(response.response.text());
}

main();
