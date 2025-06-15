import { SupabaseClient } from "@supabase/supabase-js";

export class ProfileProvider {
    private readonly sb: SupabaseClient;
    private readonly profileTableName: string;
    private readonly savedPostsTableName: string;
    private readonly likedPostsTableName: string;
    private readonly followerPairsTableName: string;
    private readonly postsTableName: string;

    constructor(sbClient: SupabaseClient) {
        if (!process.env.USERS_COLLECTION_NAME) {
            throw new Error("Missing USER_COLLECTION_NAME from env file");
        }
        this.profileTableName = process.env.USERS_COLLECTION_NAME;

        if (!process.env.SAVES_COLLECTION_NAME) {
            throw new Error("Missing SAVES_COLLECTION_NAME from env file");
        }
        this.savedPostsTableName = process.env.SAVES_COLLECTION_NAME;

        if (!process.env.LIKES_COLLECTION_NAME) {
            throw new Error("Missing LIKES_COLLECTION_NAME from env file");
        }
        this.likedPostsTableName = process.env.LIKES_COLLECTION_NAME;

        if (!process.env.FOLLOWERS_COLLECTION_NAME) {
            throw new Error("Missing FOLLOWERS_COLLECTION_NAME from env file");
        }
        this.followerPairsTableName = process.env.FOLLOWERS_COLLECTION_NAME;

        if (!process.env.POSTS_COLLECTION_NAME) {
            throw new Error("Missing POSTS_COLLECTION_NAME from env file");
        }
        this.postsTableName = process.env.POSTS_COLLECTION_NAME;

        this.sb = sbClient;
    }

    async getProfile(username: string) {
        const { data, error } = await this.sb.from(this.profileTableName)
            .select(
                `*,
                    ${this.likedPostsTableName}(
                        *,
                        ${this.postsTableName}(*)
                    ),
                    ${this.savedPostsTableName}(
                        *,
                        ${this.postsTableName}(*)
                    )`)
            .eq("username", username)
        if (error) throw new Error("Can't find user");

        return data[0];
    }

    async getPosts(username: string) {
        const { data, error } = await this.sb.from(this.postsTableName)
            .select()
            .eq("poster", username)
        if (error) throw new Error("Can't find user's posts");

        return data;
    }

    async getFollowers(username: string) {
        const { data, error } = await this.sb.from(this.followerPairsTableName)
            .select()
            .eq("followee", username)
        if (error) throw new Error("Can't find user's posts");

        return data;
    }

    async getFollowees(username: string) {
        const { data, error } = await this.sb.from(this.followerPairsTableName)
            .select()
            .eq("follower", username)
        if (error) throw new Error("Can't find user's posts");

        return data;
    }

    async changeUsername(oldusername: string, newusername: string) {
        const { data, error } = await this.sb.from(this.profileTableName)
            .select()
            .eq("username", oldusername)
        if (error) throw new Error("Can't find user's posts");

        console.log(data);

        return data;


    }
}
