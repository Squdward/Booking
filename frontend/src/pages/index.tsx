import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { NotFoundPage } from "./404";
import { AuthPage } from "./auth";
import { RegisterPage } from "./register";
import { ProtectedRoute } from "../shared/AuthProviders";

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
        element: 
            <ProtectedRoute>
                <div>Cart</div>
            </ProtectedRoute>
    },
    {
        path: "/profile",
        element: 
            <ProtectedRoute>
                <div>Profile</div>
            </ProtectedRoute>
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
])

export {RouterConfig}