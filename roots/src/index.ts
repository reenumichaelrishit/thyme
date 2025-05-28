import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { createClient } from '@supabase/supabase-js'
import {registerAuthRoutes, verifyAuthToken} from "./routes/auth";
import { registerPostsRoutes } from "./routes/posts";

const cors = require("cors");

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

const { SB_PROJECT_ID, SB_SERVICE_ROLE_KEY, JWT_SECRET} = process.env;
const sbUrl = `https://${SB_PROJECT_ID}.supabase.co`;

const supabase = createClient(sbUrl, SB_SERVICE_ROLE_KEY ?? "", {
    global: {
        headers: {
            Authorization: `Bearer ${SB_SERVICE_ROLE_KEY}`
        }
    }});

const app = express();
app.use(express.json());
app.use(express.static(staticDir));
app.use(cors({
    origin: process.env.FRONTEND_SERVER,
    methods: ["GET", "POST"],
    credentials: true
}))

registerAuthRoutes(app, supabase);
registerPostsRoutes(app, supabase);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.use("/api/*", verifyAuthToken);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../sprig/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
