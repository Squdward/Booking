import { Navigate, createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "./404";
import { AuthPage } from "./auth";
import { RegisterPage } from "./register";
import { ProtectedRoute } from "../shared/AuthProviders";
import { Books } from "./books";
import { Layout } from "../layout";
import { BookLoader } from "./books/model";
import { CreateBook } from "../view/createBook";

const RouterConfig = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/books" />,
    },
    {
        path: "/create",
        element: <CreateBook />,
    },
    {
        path: "/books",
        loader: BookLoader,
        element: (
            <Layout>
                <Books />
            </Layout>
        ),
    },
    {
        path: "/books/:id",
        loader: BookLoader,
        element: (
            <Layout>
                <Books />
            </Layout>
        ),
    },
    {
        path: "/auth",
        element: <AuthPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/book/:id",
        element: <div>book with id</div>,
    },
    {
        path: "/author/:id",
        element: <div>author with id</div>,
    },
    {
        path: "/cart",
        element: (
            <ProtectedRoute>
                <div>Cart</div>
            </ProtectedRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <div>Profile</div>
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export { RouterConfig };
