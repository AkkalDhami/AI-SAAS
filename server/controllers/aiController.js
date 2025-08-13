
import OpenAI from "openai";
import { insertArticleData } from "../services/aiServices.js";

const ai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, legth } = req.body;
        console.log(req.body);
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({
                success: false,
                message: "You have reached your free usage limit. Please upgrade to a premium plan to continue."
            });
        }

        const response = await ai.chat.completions.create({
            model: "gemini-2.5-flash",
            reasoning_effort: "low",
            messages: [
                {
                    role: "user",
                    content: prompt
                },
            ],
            temperature: 0.7,
            max_tokens: legth,
        });

        const content = response.choices[0].message.content;

        await insertArticleData({ userId, content, prompt, type: 'article' });

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        res.json({
            success: true,
            content
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const generateImage = async (req, res) => { }