import dotenv from "dotenv";
import {SupabaseClient} from "@supabase/supabase-js";
import express, {NextFunction, Request, Response} from "express";
import { SearchProvider } from "../SearchProvider";

dotenv.config();

/*
 * Routes defined in this file:
 * - [GET] "/api/search/:type/:query"
 */

export function registerSearchRoutes(app: express.Application, sbClient: SupabaseClient) {
    app.get("/api/search/:type/:query", async (req: Request, res: Response): Promise<any> => {
        const { type, query } = req.params;
        const searchP = new SearchProvider(sbClient);

        let result;

        switch (type) {
            case "recipe":
                result = await searchP.searchPosts(query);
                break;
            case "user":
                result = await searchP.searchUsers(query);
                break;
            default:
                // "type" param is not a valid type
                return res.status(400).send({
                    error: "Bad request",
                    message: "\'type\' must be \"recipe\" or \"user\""
                })
        }
        
        // If something goes wrong...
        if (!result) {
            return res.status(500).send({ error: "Internal server error!" });
        }

        // Extract data and/or error
        const { data, status, error } = result;

        // Search did not work
        if (!data || error) {
            return res.status(status).send(error);
        }

        // All went well!
        return res.status(status).send(data);
    })
}
