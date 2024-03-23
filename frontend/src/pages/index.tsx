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
import { bookByIdLoader } from "../store/book/model";
import { AuthorPage } from "./author";
import { authorLoader } from "../store/author/model";
import { CartPage } from "./cart";
import { cartLoader } from "../store/cart/model";

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
        loader: authorLoader,
        element: (
            <Layout sidebar={false}>
                <AuthorPage />
            </Layout>
        ),
    },
    {
        path: "/cart",
        loader: cartLoader,
        element: (
            <ProtectedRoute>
                <Layout sidebar={false}>
                    <CartPage/>
                </Layout>
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
