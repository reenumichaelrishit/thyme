import { SupabaseClient } from "@supabase/supabase-js";

export class SearchProvider {
    private readonly sb: SupabaseClient;
    private readonly postsTableName: string;
    private readonly usersTableName: string;
    private readonly likesTableName: string;
    private readonly savesTableName: string;

    constructor(sbClient: SupabaseClient) {
        if (!process.env.POSTS_COLLECTION_NAME) {
            throw new Error("Missing POSTS_COLLECTION_NAME from env file");
        }

        if (!process.env.USERS_COLLECTION_NAME) {
            throw new Error("Missing USERS_COLLECTION_NAME from env file");
        }

        if (!process.env.LIKES_COLLECTION_NAME) {
            throw new Error("Missing LIKES_COLLECTION_NAME from env file");
        }

        if (!process.env.SAVES_COLLECTION_NAME) {
            throw new Error("Missing SAVES_COLLECTION_NAME from env file");
        }

        this.postsTableName = process.env.POSTS_COLLECTION_NAME;
        this.usersTableName = process.env.USERS_COLLECTION_NAME;
        this.likesTableName = process.env.LIKES_COLLECTION_NAME;
        this.savesTableName = process.env.SAVES_COLLECTION_NAME;
        this.sb = sbClient;
    }

    async searchPosts (query: string) {
        const { data, error, status } = await this.sb
            .from(this.postsTableName)
            .select(`*, ${this.likesTableName}(count), ${this.savesTableName}(count)`)
            .ilike("title", `%${query}%`)
            .order("created_at", { ascending: false });
        
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

    async searchUsers (query: string) {
        const { data, error, status } = await this.sb
            .from(this.usersTableName)
            .select()
            .ilike("username", `%${query}%`);
        
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
}
