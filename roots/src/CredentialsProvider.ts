import bcrypt from "bcrypt";
import { SupabaseClient } from "@supabase/supabase-js";

export class CredentialsProvider {
    private readonly sb: SupabaseClient;
    private readonly credTableName: string;
    private readonly usersTableName: string;

    constructor(sbClient: SupabaseClient) {
        if (!process.env.CREDS_COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        if (!process.env.USERS_COLLECTION_NAME) {
            throw new Error("Missing USERS_COLLECTION_NAME from env file");
        }
        this.credTableName = process.env.CREDS_COLLECTION_NAME;
        this.usersTableName = process.env.USERS_COLLECTION_NAME;
        this.sb = sbClient;
    }

    async registerUser(username: string, plaintextPassword: string) {
        const { data, error } = await this.sb.from(this.credTableName).select("username").eq("username", username).maybeSingle()
        if (data) {
            return false;
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt)

        const { status } = await this.sb.from(this.credTableName).insert(
            { username: username, password: hashedPassword },
        );

        return status === 201;
    }

    async addToUsers(username: string, email: string, profilePhoto: string) {
        const { data, error } = await this.sb.from(this.usersTableName).select("username").eq("username", username).maybeSingle()
        if (data) {
            return false;
        }

        const { status } = await this.sb.from(this.usersTableName).insert(
            {
                username: username,
                email: email,
                bio: "",
                profilePhoto: profilePhoto
            },
        );

        return status === 201;
    }

    async verifyPassword(username: string, plaintextPassword: string) {
        const { data, error} = await this.sb.from(this.credTableName).select("password").eq("username", username).single()

        if (error || !data) {
            return false;
        }

        return bcrypt.compare(plaintextPassword, data.password)
    }

    async getProfilePhoto(username: string) {
        const { data, error } = await this.sb.from(this.usersTableName).select("profilePhoto").eq("username", username).single()

        if (error || !data) {
            return { error: "error getting profile photo" }
        }

        return { data: data.profilePhoto }
    }
}
