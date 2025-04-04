import { Input } from "../../components/Input"
import { LogInSectionProps } from "./AccountPage"
import { FormStyled, FormContainer, Heading, SubmitButton, SwitchText, FormSection } from "./styled.components"


const LogIn = ({ newAccount, setNewAccount } : LogInSectionProps) => (
    <FormContainer $newAccount={newAccount}>
        <FormStyled $newAccount={newAccount}>
            <Heading>log in!</Heading>
            <FormSection $newAccount={newAccount}>
                <Input type="text" label="username" />
                <Input type="password" label="password" />
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
)

export default LogIn