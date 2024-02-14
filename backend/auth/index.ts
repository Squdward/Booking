/** @type {import('mock-config-server').MockServerConfig} */

import { SignUp } from "./register"
import { SignIn } from "./signin"

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
]


export {AuthController}