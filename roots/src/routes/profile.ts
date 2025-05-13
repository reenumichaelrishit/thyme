import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {SupabaseClient} from "@supabase/supabase-js";
import express, {NextFunction, Request, Response} from "express";
import {ProfileProvider} from "../ProfileProvider";

dotenv.config();

export function registerProfileRoutes(app: express.Application, sbClient: SupabaseClient) {

    app.get("/api/profile/:username", (req: Request, res: Response) => {
        if(!(req.params.username)){
            res.status(400).send({
                error: "Bad request",
                message: "Missing username"
            });
        }
        else {
            const profP = new ProfileProvider(sbClient)
            profP.getProfile(req.params.username)
                .then(
                    data => {
                        if (!data) {
                            res.status(400).send({
                                error: "Bad request",
                                message: "User not found"
                            });
                        }
                        else {
                            res.status(201).send({data})
                        }
                    })
                    // (profile)=>{res.status(200).send{profile})
        }
    });
}
