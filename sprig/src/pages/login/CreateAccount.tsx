import { Input } from "../../components/Input"
import { LogInSectionProps } from "./AccountPage"
import { FormStyled, FormContainer, Heading, SubmitButton, SwitchText, FormSection } from "./styled.components"
import {sendPostRequest} from "../../fetches/sendPostRequest.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";

const CreateAccount = ({ newAccount, setNewAccount, setAuthToken } : LogInSectionProps) => {
    const navigate = useNavigate();

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const result = await sendPostRequest("/auth/register", {username, password});

        if (result.error) {
            if (result.status === 409) {
                return {type: "error", message: "Username already exists."};
            } else if (result.status === 400) {
                return {type: "error", message: "Please provide a username and password."};
            } else if (result.status === 500) {
                return {type: "error", message: "Server error. Please try again later."};
            }
            return {type: "error", message: result.error};
        }

        if (result.token) {
            setAuthToken(result.token);
            navigate("/");
        } else {
            console.error("Token not found in result:", result);
            return {type: "error", message: "Login failed, no token received."};
        }

        return {type: "success", message: "Account created successfully!"};
    };

    return (
        <FormContainer $newAccount={newAccount}>
            <FormStyled $newAccount={newAccount} onSubmit={handleRegister}>
                <Heading>make an account!</Heading>
                <FormSection $newAccount={newAccount}>
                    <Input type="text" label="email address" name="email address"/>
                    <Input type="text" label="username" name="username"/>
                    <Input type="password" label="password" name="password"/>
                </FormSection>
                <FormSection $newAccount={newAccount}>
                    <SubmitButton type="submit">create account</SubmitButton>
                    <SwitchText onClick={() => setNewAccount(false)}>
                        have an account? sign in instead!
                    </SwitchText>
                </FormSection>
            </FormStyled>
        </FormContainer>
    );
};

export default CreateAccount;