import express from "express";
import { generateArticle, generateBlogTitle, generateImage } from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate-article", auth, generateArticle);
router.post("/generate-blog-title", auth, generateBlogTitle);
router.post("/generate-image", auth, generateImage);

export default router;