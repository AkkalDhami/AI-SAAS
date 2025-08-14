
import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";
import { insertArticleData, insertImageData, insertRemoveImageBgData, insertRemoveImageObjectData, insertResumeReviewData } from "../services/aiServices.js";
import axios from "axios";

import fs from 'fs'
import pdf from "pdf-parse/lib/pdf-parse.js";

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

export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
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
            max_tokens: 100,
        });

        const content = response.choices[0].message.content;

        await insertArticleData({ userId, content, prompt, type: 'blog-title' });

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

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        console.log(req.body);
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available to premium users."
            });
        }
        const formdata = new FormData()
        formdata.append("prompt", prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: 'arraybuffer'
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`

        const { secure_url } = await cloudinary.uploader.upload(base64Image)

        await insertImageData({ userId, secure_url, prompt, type: 'image', publish });

        res.json({
            success: true,
            content: secure_url
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { image } = req.file;

        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available to premium users."
            });
        }



        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [{
                effect: 'background_removal',
                background_removal: 'remove_the_background'
            }]
        })

        const prompt = 'Remove the background from this image';
        await insertRemoveImageBgData({ userId, secure_url, prompt, type: 'image' });

        res.json({
            success: true,
            content: secure_url
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { image } = req.file;
        const { object } = req.body;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available to premium users."
            });
        }

        const { public_id } = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [{
                effect: `gen_remove:${object}`
            }],
            resource_type: 'image'
        })

        const prompt = `Remove the ${object} from this image`
        await insertRemoveImageObjectData({ userId, imageUrl, prompt, type: 'image' });

        res.json({
            success: true,
            content: imageUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        // const { file } = req.file;
        const file = req.file;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available to premium users."
            });
        }

        if (file.size > 5 * 1024 * 1024) {
            return res.json({
                success: false,
                message: "File size should be less than 5MB"
            })
        }

        const dataBuffer = fs.readFileSync(file.path);
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n ${pdfData.text}`


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
            max_tokens: 1000,
        });

        const content = response.choices[0].message.content;

        await insertResumeReviewData({ userId, content, type: 'resume-review' });

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

