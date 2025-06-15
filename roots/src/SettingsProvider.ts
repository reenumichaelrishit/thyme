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

    async changeUsername(oldusername: string, newusername: string) {
        const { error } = await this.sb
            .from(this.profileTableName)
            .update({ username: newusername })
            .eq("username", oldusername)

        if (error) throw new Error("Can't change username");

        return 200;
    }

    async changeEmail(username: string, newemail: string) {
        const { error } = await this.sb
            .from(this.profileTableName)
            .update({ email: newemail })
            .eq("username", username)

        if (error) throw new Error("Can't change email");

        return 200;
    }

    async changeBio(username: string, newbio: string) {
        const { error } = await this.sb
            .from(this.profileTableName)
            .update({ bio: newbio })
            .eq("username", username)

        if (error) throw new Error("Can't change bio");

        return 200;
    }

    async changeProfilePicture(username: string, newpfp: string) {
        const { error } = await this.sb
            .from(this.profileTableName)
            .update({ profilePhoto: newpfp })
            .eq("username", username)

        if (error) throw new Error("Can't change profile picture");

        return 200;
    }
}
