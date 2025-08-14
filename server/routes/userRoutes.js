import express from "express";
import { getPublishedCreation, getUserCreation, toggleLikeCreation } from "../controllers/userController.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/get-user-creations", auth, getUserCreation);
router.get("/get-published-creations", auth, getPublishedCreation);
router.post("/toggle-like-creation", auth, toggleLikeCreation);

export default router;