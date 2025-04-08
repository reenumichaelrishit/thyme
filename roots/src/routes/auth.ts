import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {SupabaseClient} from "@supabase/supabase-js";
import express, {NextFunction, Request, Response} from "express";
import {CredentialsProvider} from "../CredentialsProvider";

dotenv.config();

function generateAuthToken(username: string): Promise<string> {
    const signatureKey: string | undefined= process.env.JWT_SECRET;
    if (!signatureKey) {
        throw new Error("JWT_SECRET environment variable is not set");
    }

    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey,
            { expiresIn: "1d" },
            (error: Error | null, token: string | undefined) => {
                if (error || !token) reject(error);
                else resolve(token);
            }
        );
    });
}

export function registerAuthRoutes(app: express.Application, sbClient: SupabaseClient) {
    app.post("/auth/register", (req: Request, res: Response) => {
        if(!(req.body.username && req.body.password)){
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
        }

        const credP = new CredentialsProvider(sbClient)

        credP.registerUser(req.body.username, req.body.password).then(available => {
            if (!available) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Username already taken"
                });
            }
            const token = generateAuthToken(req.body.username)
            res.status(201).send({token: token})
        })
    });

    app.post("/auth/login", (req: Request, res: Response) => {
        const {username, password} = req.body;
        if(!(username && password)) {
            res.status(400).send({
                error: "Bad request",
                message: "Did not provide username or password"
            });
        }
        const credP = new CredentialsProvider(sbClient)

        credP.verifyPassword(username, password).then(matches =>
        {
            if(matches) {
                const token = generateAuthToken(username)
                res.status(200).send({token: token})
            }
            else res.status(401).send({
                error: "Bad request",
                message: "Incorrect username or password"
            });
        })
    });
}
