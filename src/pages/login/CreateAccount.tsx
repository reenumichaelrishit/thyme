import Input from "../../components/Input"
import { LogInSectionProps } from "./AccountPage"
import { FormStyled, FormContainer, Heading, SubmitButton, SwitchText, FormSection } from "./styled.components"


const CreateAccount = ({ newAccount, setNewAccount } : LogInSectionProps) => (
    <FormContainer $newAccount={newAccount}>
        <FormStyled $newAccount={newAccount}>
            <Heading>make an account!</Heading>
            <FormSection $newAccount={newAccount}>
                <Input type="text" label="email address" />
                <Input type="text" label="username" />
                <Input type="password" label="password" />
            </FormSection>
            <FormSection $newAccount={newAccount}>
                <SubmitButton type="submit">create account</SubmitButton>
                <SwitchText onClick={() => setNewAccount(false)}>
                    have an account? sign in instead!
                </SwitchText>
            </FormSection>
        </FormStyled>
    </FormContainer>
)

export default CreateAccount