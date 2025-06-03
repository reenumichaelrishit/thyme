import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import * as Pages from "./pages"
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { AuthContext } from "./AuthContext.ts"
import { ThemeContextProvider } from "./ThemeContext.tsx"

function App() {
    const [email, setEmail] = useState("Jane Doe");
    const [username, setUsername] = useState("");
    const [authToken, setAuthToken] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const [isDarkMode, setIsDarkMode] = useState(false)
    const toggleTheme = () => setIsDarkMode(!isDarkMode)

    console.log(`username: ${email}`);

    useEffect(() => {
        setEmail("me");
    }, []); // Empty dependency array: runs once on mount

    return (
        <ThemeContextProvider isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
            <AuthContext.Provider value={{ username, setUsername, profilePhoto, setProfilePhoto, authToken, setAuthToken }}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={<Pages.Home />}
                        />
                        <Route
                            path="/login"
                            element={<Pages.AccountPage />}
                        />
                        <Route
                            path="/create"
                            element={
                                <ProtectedRoute>
                                    <Pages.CreatePost />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/post/:postID"
                            element={<Pages.ViewPost />}
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Pages.ProfilePage ownProfile={true}/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <Pages.Settings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/search-results"
                            element={<Pages.SearchResults />}
                        />
                        <Route
                            path="/search-results/:query"
                            element={<Pages.SearchResults />}
                        />
                    </Route>
                </Routes>
            </AuthContext.Provider>
        </ThemeContextProvider>
    )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)

/*
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Pages.Home />
            },
            {
                path: "/login",
                element: <Pages.AccountPage />
            },
            {
                path: "/create",
                element: <Pages.CreatePost />
            },
            {
                path: "/profile",
                element: <Pages.ProfilePage ownProfile = {true} />
            },
            {
                path: "/settings",
                element: <Pages.Settings />
            },
            {
                // Needs to be modified later
                path: "/search-results",
                element: <Pages.SearchResults />
            }
        ]
    }
])*/