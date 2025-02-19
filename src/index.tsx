import React from "react"
import ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
import About from "./components/About"

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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)