import { createContext, ReactNode, useContext } from "react"
import { ThemeProvider } from "styled-components"
import { DarkMode, LightMode } from "./tokens"

interface ThemeProps {
    isDarkMode: boolean,
    toggleTheme: () => void
}

interface ThemeContextProps extends ThemeProps {
    children: ReactNode
}

const ThemeContext = createContext<ThemeProps>({
    isDarkMode: false,
    toggleTheme: () => {}
})

export const ThemeContextProvider = ({ children, isDarkMode, toggleTheme }: ThemeContextProps) => (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <ThemeProvider theme={isDarkMode ? DarkMode : LightMode}>
            {children}
        </ThemeProvider>
    </ThemeContext.Provider>
)

// Can ONLY be used INSIDE of a ThemeContext!
export const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context) { throw new Error("useTheme can only be used inside of a ThemeContext") }

    return context
}