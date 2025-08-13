import { db } from "../configs/db.js";

export const insertArticleData = async ({ userId, content, prompt, type }) => {
    try {
        await db`INSERT INTO creations (user_id, content, prompt, type) VALUES (${userId}, ${content}, ${prompt}, ${type})`;
    } catch (error) {
        console.error("Error inserting article data:", error);
    }
};

export const insertImageData = async ({ userId, secure_url, prompt, type, publish }) => {
    try {
        await db`INSERT INTO creations (user_id, content, prompt, type, publish) VALUES (${userId}, ${secure_url}, ${prompt}, ${type}, ${publish})`;
    } catch (error) {
        console.error("Error inserting article data:", error);
    }
};