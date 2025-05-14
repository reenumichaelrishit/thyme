import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom/client"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./tokens"
import Layout from "./components/Layout"
import * as Pages from "./pages"
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";

function App() {
    const [userName, setUserName] = useState("Jane Doe");
    const [authToken, setAuthToken] = useState("");

    console.log(`username: ${userName}`);
    useEffect(() => {
        setUserName("me");
    }, []); // Empty dependency array: runs once on mount

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={<Pages.Home />}
                />
                <Route
                    path="/login"
                    element={<Pages.AccountPage setAuthToken={setAuthToken}/>}
                />
                <Route
                    path="/create"
                    element={
                        <ProtectedRoute authToken={authToken}>
                            <Pages.CreatePost />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute authToken={authToken}>
                            <Pages.ProfilePage ownProfile = {true}/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute authToken={authToken}>
                            <Pages.Settings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/search-results"
                    element={<Pages.SearchResults />}
                />
            </Route>
        </Routes>
    )
}
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
)