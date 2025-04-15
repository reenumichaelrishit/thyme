import React from "react"
import ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/home/Home"
import { ThemeProvider } from "styled-components"
import theme from "./tokens"
import AccountPage from "./pages/login/AccountPage"
import CreatePost from "./pages/create-post/CreatePost"
import ProfilePage from "./pages/profile/ProfilePage"
import Settings from "./pages/settings/SettingsPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/login",
                element: <AccountPage />
            },
            {
                path: "/create",
                element: <CreatePost />
            },
            {
                path: "/profile",
                element: <ProfilePage ownProfile = {true} />
            },
            {
                path: "/settings",
                element: <Settings />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)