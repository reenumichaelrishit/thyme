import { Input } from "../../components/Input"
import { LogInSectionProps } from "./AccountPage"
import { FormStyled, FormContainer, Heading, SubmitButton, SwitchText, FormSection } from "./styled.components"
import React from "react";
import {sendPostRequest} from "../../fetches/sendPostRequest.tsx";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../AuthContext.ts";


const LogIn = ({ newAccount, setNewAccount } : LogInSectionProps) => {
    const navigate = useNavigate()
    const { setUsername, setProfilePhoto, setAuthToken } = useAuth()

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const result = await sendPostRequest("/auth/login", {username, password});

        if (result.error) {
            if (result.status === 401) {
                console.log(`wrong creds`)
                return {type: "error", message: "Incorrect username or password."};
            } else if (result.status === 500) {
                return {type: "error", message: "Server error. Please try again later."};
            }
            return {type: "error", message: result.error};
        }

        if (result.token) {
            setAuthToken(result.token);
            setProfilePhoto(result.profilePhoto);
            setUsername(username);
            navigate("/");
        } else {
            console.error("Token not found in result:", result);
            return {type: "error", message: "Login failed, no token received."};
        }
        console.log(`signed in!!!`)
        return {type: "success", message: "Logged in successfully!"};

    };

    return (
        <FormContainer $newAccount={newAccount}>
            <FormStyled $newAccount={newAccount} onSubmit={handleLogin}>
                <Heading>log in!</Heading>
                <FormSection $newAccount={newAccount}>
                    <Input type="text" label="username" name="username"/>
                    <Input type="password" label="password" name="password"/>
                </FormSection>
                <FormSection $newAccount={newAccount}>
                    <SubmitButton type="submit">log in</SubmitButton>
                    <SwitchText onClick={() => setNewAccount(true)}>
                        forgot password?
                    </SwitchText>
                    <SwitchText onClick={() => setNewAccount(true)}>
                        don't have an account? make one today!
                    </SwitchText>
                </FormSection>
            </FormStyled>
        </FormContainer>
    );
};

export default LogIn