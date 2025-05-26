import dotenv from "dotenv";
import {SupabaseClient} from "@supabase/supabase-js";
import express, {NextFunction, Request, Response} from "express";
import { PostsProvider } from "../PostsProvider";

dotenv.config();

/*
 * Routes defined in this file:
 * - [GET] "/api/posts/get"
 * - [GET] "/api/posts/get/:id"
 * - [POST] "/api/posts/add"
 * - [POST] "/api/posts/interact/add"
 * - [POST] "/api/posts/interact/remove"
 * - [POST] "/api/posts/comments/add"
 * - [POST] "/api/posts/comments/like"
 * - [POST] "/api/posts/comments/unlike"
 */

export function registerPostsRoutes(app: express.Application, sbClient: SupabaseClient) {
    // Get ALL posts [limited to 10]
    app.get("/api/posts/get", async (_req: Request, res: Response): Promise<any> => {
        const postsP = new PostsProvider(sbClient)
        const result = await postsP.getPosts()

        if (!result.data || result.error) {
            return res.status(result.status).send(result.error);
        }
        
        return res.status(result.status).send(result.data);
    })

    // Getting a post by [id]
    app.get("/api/posts/get/:id", async (req: Request, res: Response): Promise<any> => {
        const postsP = new PostsProvider(sbClient)
        const result = await postsP.getPostById(req.params.id)

        if (!result.data || result.error) {
            return res.status(result.status).send(result.error);
        }
        
        return res.status(result.status).send(result.data);
    })

    // Adding a post
    app.post("/api/posts/add", async (req: Request, res: Response): Promise<any> => {
        // Did not include [title] or [poster]
        if (!req.body.title || !req.body.poster) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing attributes"
            })
        }
        
        // Included [id] or [created_at]
        if (req.body.id || req.body.created_at) {
            return res.status(400).send({
                error: "Bad request",
                message: "Attributes [id] & [created_at] should not be inputs"
            })
        }
        
        // All is well!
        const { tags, ...postContent } = req.body

        // Adding post content & getting back the ID
        const { data, error, status } = await sbClient
            .from("Posts")
            .insert(postContent)
            .select("id");
        
        // If insert or select go wrong...
        if (!data || error) {
            return res.status(status).send(error);
        }

        const postId = data && data[0]["id"]

        // Creating & inserting tagsContent
        const tagsContent = tags.map(
            (item: any) => ({
                name: item,
                postId: postId
            })
        )

        const tagsResult = await sbClient
            .from("Tags")
            .insert(tagsContent)
        
        if (tagsResult.error) {
            return res.status(tagsResult.status).send(tagsResult.error);
        }

        // Creating & inserting ingredientTagsContent
        const ingredientTagsContent = postContent.ingredients.map(
            (item: any) => ({
                name: item.ingredient,
                postId: postId
            })
        )

        const ingredientTagsResult = await sbClient
            .from("IngredientTags")
            .insert(ingredientTagsContent)
        
        if (ingredientTagsResult.error) {
            return res.status(ingredientTagsResult.status).send(ingredientTagsResult.error);
        }

        // All has happened well!
        return res.status(201).send({
            message: "Post created",
            id: postId
        })
    })

    // Liking/saving a post
    app.post("/api/posts/interact/add", async (req: Request, res: Response): Promise<any> => {
        // Did not include [type], [postid] or [userid]
        if (!req.body.type || !req.body.postid || !req.body.userid) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing attributes"
            })
        }

        // Invalid [type]
        if (req.body.type !== "like" && req.body.type !== "save") {
            return res.status(400).send({
                error: "Bad request",
                message: "Invalid type"
            })
        }
        
        // All is well!
        const { type, ...interactData } = req.body
        const tableName = type === "like" ? "Likes" : "SavedPosts";
        const { error, status } = await sbClient
            .from(tableName)
            .insert(interactData);
        
        // If insert goes wrong...
        if (error) {
            return res.status(status).send(error);
        }

        return res.status(status).send({
            message: "Interaction confirmed"
        });
    })

    // Un-liking/un-saving a post
    app.post("/api/posts/interact/remove", async (req: Request, res: Response): Promise<any> => {
        // Did not include [type], [postid] or [userid]
        if (!req.body.type || !req.body.postid || !req.body.userid) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing attributes"
            })
        }

        // Invalid [type]
        if (req.body.type !== "like" && req.body.type !== "save") {
            return res.status(400).send({
                error: "Bad request",
                message: "Invalid type"
            })
        }
        
        // All is well!
        const tableName = req.body.type === "like" ? "Likes" : "SavedPosts";
        const response = await sbClient
            .from(tableName)
            .delete()
            .eq("postid", req.body.postid)
            .eq("userid", req.body.userid);

        return res.status(200).send(response);
    })

    // Adding a comment
    app.post("/api/posts/comments/add", async (req: Request, res: Response): Promise<any> => {
        // Did not include [commenter], [commentedPost] or [commentText]
        if (!req.body.commenter || !req.body.commentedPost || !req.body.commentText) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing attributes"
            })
        }
        
        // Included [id] or [created_at] or [likes]
        if (req.body.id || req.body.created_at || req.body.likes) {
            return res.status(400).send({
                error: "Bad request",
                message: "Attributes [id], [created_at] & [likes] should not be inputs"
            })
        }
        
        // All is well!
        const { data, error, status } = await sbClient
            .from("Comments")
            .insert(req.body)
            .select("id");
        
        // If insert or select go wrong...
        if (!data || error) {
            return res.status(status).send(error);
        }

        return res.status(status).send({
            message: "Comment created",
            id: data[0]["id"]
        });
    })

    // Liking a comment
    app.post("/api/posts/comments/like", async (req: Request, res: Response): Promise<any> => {
        // Did not include [commentid] or [userid]
        if (!req.body.commentid || !req.body.userid) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing attributes"
            })
        }
        
        // All is well!
        const { error, status } = await sbClient
            .from(`CommentLikes`)
            .insert(req.body);
        
        // If insert goes wrong...
        if (error) {
            return res.status(status).send(error);
        }

        return res.status(status).send({
            message: "Comment liked"
        });
    })

    // Un-liking/un-saving a post
    app.post("/api/posts/comments/unlike", async (req: Request, res: Response): Promise<any> => {
        // Did not include [commentid] or [userid]
        if (!req.body.commentid || !req.body.userid) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing attributes"
            })
        }
        
        // All is well!
        const response = await sbClient
            .from(`CommentLikes`)
            .delete()
            .eq("commentid", req.body.commentid)
            .eq("userid", req.body.userid);

        return res.status(200).send(response);
    })
}
