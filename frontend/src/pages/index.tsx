import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { NotFoundPage } from "./404";
import { AuthPage } from "./auth";
import { RegisterPage } from "./register";

const RouterConfig = createBrowserRouter([
    {
        path: "/",
        element: <Layout><div>Home</div></Layout>
    },
    {
        path: "/auth",
        element: <AuthPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/book/:id",
        element: <div>book with id</div>
    },
    {
        path: "/cart",
        element: <div>Cart</div>
    },
    {
        path: "/profile",
        element: <div>Profile</div>
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
])

export {RouterConfig}