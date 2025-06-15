import dotenv from "dotenv";
import {SupabaseClient} from "@supabase/supabase-js";
import express, {NextFunction, Request, Response} from "express";
import { FollowProvider } from "../FollowProvider";

dotenv.config();

/*
 * Routes defined in this file:
 */

export function registerFollowRoutes(app: express.Application, sbClient: SupabaseClient) {
    app.get("/api/follow/:recipient/:requester", async (req: Request, res: Response): Promise<any> => {
        const { requester, recipient } = req.params;
        const followP = new FollowProvider(sbClient);

        const result = await followP.getFollowData(requester, recipient);

        if (result.error) {
            return res.status(400).send({ message: "something went wrong getting follow data!" });
        }

        // All went well!
        return res.status(200).send({ data: result.data });
    })

    app.post("/api/follow", async (req: Request, res: Response): Promise<any> => {
        const { requester, recipient } = req.body;

        if (!requester || !recipient) {
            return res.status(400).send({ message: "[requester] & [recipient] needed!" });
        }

        const followP = new FollowProvider(sbClient);
        const result = await followP.followSomeone(requester, recipient);

        if (result.error) {
            return res.status(400).send({ message: "something went wrong following someone!" });
        }

        // All went well!
        return res.status(200).send({ message: "all OK!" });
    })

    app.post("/api/unfollow", async (req: Request, res: Response): Promise<any> => {
        const { requester, recipient } = req.body;

        if (!requester || !recipient) {
            return res.status(400).send({ message: "[requester] & [recipient] needed!" });
        }

        const followP = new FollowProvider(sbClient);
        const result = await followP.unfollowSomeone(requester, recipient);

        if (result.error) {
            return res.status(400).send({ message: "something went wrong unfollowing someone!" });
        }

        // All went well!
        return res.status(200).send({ message: "all OK!" });
    })
}
