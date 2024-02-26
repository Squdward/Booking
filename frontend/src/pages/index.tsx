import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../shared/layout";

const RouterConfig = createBrowserRouter([
    {
        path: "/",
    },
    {
        path: "/auth",
        element: <div>Auth</div>
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
        element: <div>404</div>
    }
])

export {RouterConfig}