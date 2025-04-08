import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import {createClient} from '@supabase/supabase-js'
import {registerAuthRoutes} from "./routes/auth";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

const { SB_PROJECT_ID, SB_SERVICE_ROLE_KEY, JWT_SECRET} = process.env;
const sbUrl = `https://${SB_PROJECT_ID}.supabase.co`;

const supabase = createClient(sbUrl, SB_SERVICE_ROLE_KEY ?? "");

const app = express();
app.use(express.json());
app.use(express.static(staticDir));

registerAuthRoutes(app, supabase);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../sprig/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
