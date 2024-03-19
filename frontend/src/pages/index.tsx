import { Navigate, createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "./404";
import { AuthPage } from "./auth";
import { RegisterPage } from "./register";
import { ProtectedRoute } from "../shared/router/AuthProviders";
import { Books } from "./books";
import { BookLoader } from "./books/model";
import { CreateBook } from "../view/createBook";
import { Layout } from "../shared/ui/layout";
import { BookPage } from "./book";
import { bookByIdLoader } from "../features/book/model";

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
        loader: bookByIdLoader,
        element: (
            <Layout sidebar={false}>
                <BookPage />
            </Layout>
        ),
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
