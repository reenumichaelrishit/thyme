import { SupabaseClient } from "@supabase/supabase-js";

export class PostsProvider {
    private readonly sb: SupabaseClient;
    private readonly postsTableName: string;
    private readonly likesTableName: string;
    private readonly commentsTableName: string;
    private readonly commentLikesTableName: string;
    private readonly savesTableName: string;
    private readonly tagsTableName: string;
    // private readonly ingredientTagsTableName: string;

    constructor(sbClient: SupabaseClient) {
        if (
            !process.env.POSTS_COLLECTION_NAME ||
            !process.env.LIKES_COLLECTION_NAME ||
            !process.env.COMMENTS_COLLECTION_NAME ||
            !process.env.CMNT_LIKES_COLLECTION_NAME ||
            !process.env.SAVES_COLLECTION_NAME ||
            !process.env.TAGS_COLLECTION_NAME ||
            !process.env.INGR_TAGS_COLLECTION_NAME
        ) {
            throw new Error("Missing COLLECTION_NAME from env file");
        }

        this.postsTableName = process.env.POSTS_COLLECTION_NAME;
        this.likesTableName = process.env.LIKES_COLLECTION_NAME;
        this.commentsTableName = process.env.COMMENTS_COLLECTION_NAME;
        this.commentLikesTableName = process.env.CMNT_LIKES_COLLECTION_NAME;
        this.savesTableName = process.env.SAVES_COLLECTION_NAME;
        this.tagsTableName = process.env.TAGS_COLLECTION_NAME;
        // this.ingredientTagsTableName = process.env.INGR_TAGS_COLLECTION_NAME;
        this.sb = sbClient;
    }

    async getPosts() {
        const { data, error, status } = await this.sb
                .from(this.postsTableName)
                .select(
                    `*,
                    ${this.likesTableName}(*),
                    ${this.commentsTableName}(
                        *,
                        ${this.commentLikesTableName}(*)
                    ),
                    ${this.savesTableName}(*),
                    ${this.tagsTableName}(name)`)
                .order("created_at", { ascending: false })
                .limit(10);
        
        if (error) {
            return {
                status: status,
                error: error,
                data: null
            };
        }
        
        return {
            status: status,
            error: null,
            data: data
        };
    }

    async getPostById(id: string) {
        const { data, error, status } = await this.sb
                .from(this.postsTableName)
                .select(
                    `*,
                    ${this.likesTableName}(*),
                    ${this.commentsTableName}(
                        *,
                        ${this.commentLikesTableName}(*)
                    ),
                    ${this.savesTableName}(*),
                    ${this.tagsTableName}(name)`)
                .eq("id", id);
        
        if (error) {
            return {
                status: status,
                error: error,
                data: null
            };
        }
        
        return {
            status: status,
            error: null,
            data: data[0]
        };
    }
}
