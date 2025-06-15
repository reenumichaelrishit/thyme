import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {SupabaseClient} from "@supabase/supabase-js";
import express, {NextFunction, Request, Response} from "express";
import {ProfileProvider} from "../ProfileProvider";
import {SettingsProvider} from "../SettingsProvider";

dotenv.config();

export function registerSettingsRoutes(app: express.Application, sbClient: SupabaseClient) {
    app.post("/api/settings/username", async (req: Request, res: Response) : Promise<any> => {
        const {oldUsername, newUsername} = req.body;

        if( !oldUsername || !newUsername) {
            return res.status(400).send({message: "[oldUsername] and [newUsername] needed"});
        }
        const settingsP = new SettingsProvider(sbClient);

        const result = await settingsP.changeUsername(oldUsername, newUsername);
        if(result != 200) {
            return res.status(400);
        }
        return res.status(200);
    });

    app.post("/api/settings/email", async (req: Request, res: Response) : Promise<any> => {
        const {username, newEmail} = req.body;

        if( !username || !newEmail) {
            return res.status(400).send({message: "[username] and [newEmail] needed"});
        }
        const settingsP = new SettingsProvider(sbClient);

        const result = await settingsP.changeEmail(username, newEmail);
        if(result != 200) {
            return res.status(400);
        }
        return res.status(200);
    });

    app.post("/api/settings/bio", async (req: Request, res: Response) : Promise<any> => {
        const {username, newBio} = req.body;

        if( !username || !newBio) {
            return res.status(400).send({message: "[username] and [newBio] needed"});
        }
        const settingsP = new SettingsProvider(sbClient);

        const result = await settingsP.changeBio(username, newBio);
        if(result != 200) {
            return res.status(400);
        }
        return res.status(200);
    });

    app.post("/api/settings/pfp", async (req: Request, res: Response) : Promise<any> => {
        const {username, newPfp} = req.body;

        if( !username || !newPfp) {
            return res.status(400).send({message: "[username] and [newProfilePicture] needed"});
        }
        const settingsP = new SettingsProvider(sbClient);

        const result = await settingsP.changeProfilePicture(username, newPfp);
        if(result != 200) {
            return res.status(400);
        }
        return res.status(200);
    });


}
