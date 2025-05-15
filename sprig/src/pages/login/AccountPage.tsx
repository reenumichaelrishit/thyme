import LogIn from "./LogIn"
import React, { useState, Dispatch, SetStateAction } from "react"
import { ImageOverlay, Overlay } from "./styled.components"
import CreateAccount from "./CreateAccount";

export interface LogInSectionProps {
    newAccount: boolean;
    setNewAccount: Dispatch<SetStateAction<boolean>>;
    setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface AccountPageProps {
    setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

const AccountPage: React.FC<AccountPageProps> = ({ setAuthToken }) => {
    const [newAccount, setNewAccount] = useState(false)
    
    return newAccount ? (
        <Overlay $newAccount={newAccount}>
            <CreateAccount newAccount={newAccount} setNewAccount={setNewAccount} setAuthToken={setAuthToken}/>
            <ImageOverlay />
        </Overlay>
    ) : (
        <Overlay $newAccount={newAccount}>
            <ImageOverlay />
            <LogIn newAccount={newAccount} setNewAccount={setNewAccount} setAuthToken={setAuthToken} />
        </Overlay>
    )
}

export default AccountPage