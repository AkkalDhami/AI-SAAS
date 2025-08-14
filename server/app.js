import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cloudinaryConfig from "./configs/cloudinary.js";

async function startServer() {
    const app = express();

    await cloudinaryConfig();

    app.use(cors());
    app.use(express.json());
    app.use(clerkMiddleware());

    // Health check endpoint
    app.get("/health", (req, res) => {
        res.json({ status: "ok" });
    });

    app.use("/api/ai", requireAuth(), aiRouter);
    app.use("/api/user", requireAuth(), userRouter);

    // 404 handler for unknown routes
    app.use((req, res) => {
        res.status(404).json({ success: false, message: "Route not found" });
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

startServer().catch((err) => {
    console.error("❌ Server failed to start:", err);
});
