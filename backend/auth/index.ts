/** @type {import('mock-config-server').MockServerConfig} */

import { SignUp } from "./register"
import { SignIn } from "./signin"
import { Refersh } from "./refresh"

const AuthController = [
    {
        path: "/signin",
        method: "post",
        routes: [
            {
                data: null, 
                interceptors: {
                    response: SignIn,
                }
            }
        ]
    },
    {
        path: "/signup",
        method: "post",
        routes: [
            {
                data: null, 
                interceptors: {
                    response: SignUp
                }
            }
        ]
    },
    {
        path: "/refresh",
        method: "get",
        routes: [
            {
                data: null, 
                interceptors: {
                    response: Refersh 
                }
            }
        ]
    },
]


export {AuthController}