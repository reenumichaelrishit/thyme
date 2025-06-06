import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {SupabaseClient} from "@supabase/supabase-js";
import express, {NextFunction, Request, Response} from "express";
import {ProfileProvider} from "../ProfileProvider";

dotenv.config();

export function registerProfileRoutes(app: express.Application, sbClient: SupabaseClient) {

    app.get("/api/profile/:username", async (req: Request, res: Response) : Promise<any> => {
        if(!(req.params.username)){
            return res.status(400).send({
                error: "Bad request",
                message: "Missing username"
            });
        }
        else {
            const profP = new ProfileProvider(sbClient)
            const data = await profP.getProfile(req.params.username)
                // .then(
                //     data => {
                if (!data) {
                    return res.status(400).send({
                        error: "Bad request",
                        message: "User not found"
                    });
                }
                // else {
                //     res.status(200).send({data})
                // }

                const postsData = await profP.getPosts(req.params.username)
                if (!postsData) {
                    return res.status(400).send({
                        error: "Bad request",
                        message: "User not found"
                    });
                }

                const dataToSend = {
                    ...(data as object),
                    posts: postsData
                }

                return res.status(200).send(dataToSend)
        }
    });

    app.get("/api/profile/:username", async (req: Request, res: Response) : Promise<any> => {
        if(!(req.params.username)){
            return res.status(400).send({
                error: "Bad request",
                message: "Missing username"
            });
        }
        else {
            const profP = new ProfileProvider(sbClient)
            const data = await profP.getProfile(req.params.username)
            // .then(
            //     data => {
            if (!data) {
                return res.status(400).send({
                    error: "Bad request",
                    message: "User not found"
                });
            }
            // else {
            //     res.status(200).send({data})
            // }

            const postsData = await profP.getPosts(req.params.username)
            if (!postsData) {
                return res.status(400).send({
                    error: "Bad request",
                    message: "User not found"
                });
            }

            const dataToSend = {
                ...(data as object),
                posts: postsData
            }

            return res.status(200).send(dataToSend)
        }
    });
}
