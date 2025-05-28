import { createContext, Dispatch, SetStateAction, useContext } from "react"

interface AuthProps {
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    authToken: string,
    setAuthToken: Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<AuthProps>({
    username: "",
    setUsername: () => {},
    authToken: "",
    setAuthToken: () => {}
})

// Can ONLY be used INSIDE of an AuthContext!
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) { throw new Error("useAuth can only be used inside of an AuthContext") }

    return context
}
