import React from "react"
import ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/home/Home"
import About from "./components/About"
import { ThemeProvider } from "styled-components"
import theme from "./tokens"
import AccountPage from "./pages/login/AccountPage"
import CreatePost from "./pages/create-post/CreatePost"

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
                path: "/about",
                element: <About />
            },
            {
                path: "/login",
                element: <AccountPage />
            },
            {
                path: "/create",
                element: <CreatePost />
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