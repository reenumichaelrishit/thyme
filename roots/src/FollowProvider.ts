import { SupabaseClient } from "@supabase/supabase-js";

export class FollowProvider {
    private readonly sb: SupabaseClient;
    private readonly followTableName: string;

    constructor(sbClient: SupabaseClient) {
        if (!process.env.FOLLOWERS_COLLECTION_NAME) {
            throw new Error("Missing FOLLOWERS_COLLECTION_NAME from env file");
        }

        this.followTableName = process.env.FOLLOWERS_COLLECTION_NAME;
        this.sb = sbClient;
    }

    async getFollowData(requester: string, someone: string) {
        const { data, error } = await this.sb
            .from(this.followTableName)
            .select()
            .eq("followee", someone)
            .eq("follower", requester);

        if (error) {
            return { error: error };
        }

        return { data: data.length > 0 };
    }

    async followSomeone(requester: string, someone: string) {
        const { error } = await this.sb
            .from(this.followTableName)
            .insert({
                followee: someone,
                follower: requester
            });

        if (error) return { error: error }

        return { message: "All OK!" }
    }

    async unfollowSomeone(requester: string, someone: string) {
        const { error } = await this.sb
            .from(this.followTableName)
            .delete()
            .eq("followee", someone)
            .eq("follower", requester);

        if (error) return { error: error }

        return { message: "All OK!" }
    }
}
