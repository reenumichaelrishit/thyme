import { SupabaseClient } from "@supabase/supabase-js";

export class ProfileProvider {
    private readonly sb: SupabaseClient;
    private readonly profileTableName: string;

    constructor(sbClient: SupabaseClient) {
        if (!process.env.USERS_COLLECTION_NAME) {
            throw new Error("Missing USER_COLLECTION_NAME from env file");
        }
        this.profileTableName = process.env.USERS_COLLECTION_NAME;
        this.sb = sbClient;
    }

    async getProfile(username: string) {
        const { data, error } = await this.sb.from(this.profileTableName)
            .select()
            .eq("username", username)
        if (error) throw new Error("Can't find user");
        return data;
    }
}
