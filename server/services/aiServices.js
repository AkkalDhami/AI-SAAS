import { db } from "../configs/db.js";

export const insertArticleData = async ({ userId, content, prompt, type }) => {
    try {
        await db`INSERT INTO creations (user_id, content, prompt, type) VALUES (${userId}, ${content}, ${prompt}, ${type})`;
    } catch (error) {
        console.error("Error inserting article data:", error);
    }
};

export const insertImageData = async ({ userId, secure_url, prompt, type, publish = false }) => {
    try {
        await db`INSERT INTO creations (user_id, content, prompt, type, publish) VALUES (${userId}, ${secure_url}, ${prompt}, ${type}, ${publish})`;
    } catch (error) {
        console.error("Error inserting article data:", error);
    }
};

export const insertRemoveImageBgData = async ({ userId, secure_url, prompt, type, }) => {
    try {
        await db`INSERT INTO creations (user_id, content, prompt, type) VALUES (${userId}, ${secure_url}, ${prompt}, ${type})`;
    } catch (error) {
        console.error("Error inserting article data:", error);
    }
};

export const insertRemoveImageObjectData = async ({ userId, imageUrl, prompt, type, }) => {
    try {
        await db`INSERT INTO creations (user_id, content, prompt, type) VALUES (${userId}, ${imageUrl}, ${prompt}, ${type})`;
    } catch (error) {
        console.error("Error inserting remove obj data:", error);
    }
};

export const insertResumeReviewData = async ({ userId, content, type, }) => {
    try {
        await db`INSERT INTO creations (user_id, content, prompt, type) VALUES (${userId}, ${content}, ${`Review the uploaded resume`}, ${type})`;
    } catch (error) {
        console.error("Error inserting resume data:", error);
    }
};

export const getUserCreationsByUserId = async (userId) => {
    try {
        const creations = await db`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
        return creations;
    } catch (error) {
        console.error("Error getting user creations:", error);
        return [];
    }
}

export const getAllPublishedCreations = async () => {
    try {
        const creations = await db`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
        return creations;
    } catch (error) {
        console.error("Error getting published creations:", error);
        return [];
    }
}

export const updateCreationLikes = async (id, formattedArray) => {
    try {
        await db`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;
    } catch (error) {
        console.error("Error updating creation likes:", error);
    }
};