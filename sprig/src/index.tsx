import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./tokens"
import Layout from "./components/Layout"
import * as Pages from "./pages"

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
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)