import { SupabaseClient } from "@supabase/supabase-js";

export class SettingsProvider {
    private readonly sb: SupabaseClient;
    private readonly profileTableName: string;
    private readonly authTableName: string;

    constructor(sbClient: SupabaseClient) {
        if (!process.env.USERS_COLLECTION_NAME) {
            throw new Error("Missing USER_COLLECTION_NAME from env file");
        }
        this.profileTableName = process.env.USERS_COLLECTION_NAME;
        if (!process.env.CREDS_COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.authTableName = process.env.CREDS_COLLECTION_NAME;

        this.sb = sbClient;
    }

    async getUsername(username: string) {
        const { data, error } = await this.sb.from(this.profileTableName)
            .select()
            .eq("username", username)
        if (error) throw new Error("Can't find old username");

        return data;
    }
    async changeUsername(oldusername: string, newusername: string) {
        const { data, error } = await this.sb.from(this.profileTableName)
            .select()
            .eq("username", oldusername)

        if (error) throw new Error("Can't change username");

        return data;
    }
}
