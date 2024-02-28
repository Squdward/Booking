import { AuthTypes } from "./config"

export interface IForm {
    email: string,
    password: string,
    name?: string,
}

export type changeFieldType = {
    [K in keyof IForm]: string
}

export interface IAuthForm {
    type: keyof typeof AuthTypes
}