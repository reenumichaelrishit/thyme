import LogIn from "./LogIn"
import { useState, Dispatch, SetStateAction } from "react"
import { ImageOverlay, Overlay } from "./styled.components"
import CreateAccount from "./CreateAccount";

export interface LogInSectionProps {
    newAccount: boolean;
    setNewAccount: Dispatch<SetStateAction<boolean>>;
}

const AccountPage = () => {
    /* If set to true, will display CreateAccount. If false, will display LogIn. */
    const [newAccount, setNewAccount] = useState(false)
    
    return newAccount ? (
        <Overlay $newAccount={newAccount}>
            <CreateAccount newAccount={newAccount} setNewAccount={setNewAccount} />
            <ImageOverlay />
        </Overlay>
    ) : (
        <Overlay $newAccount={newAccount}>
            <ImageOverlay />
            <LogIn newAccount={newAccount} setNewAccount={setNewAccount} />
        </Overlay>
    )
}

export default AccountPage