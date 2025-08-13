import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, requireAuth } from '@clerk/express'


import aiRouter from "./routes/aiRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(requireAuth());
app.use('/api/ai', aiRouter)


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});