import { AuthTypes } from "./config"

export interface IForm {
    email: string,
    password: string,
    name?: string,
    // type: IAuthForm['type']
}

type IFormErrors = {
    [K in keyof IForm]: IForm[K] | null;
}

export type changeFieldType = {
    [K in keyof IForm]: string
}

export type AuthType = keyof typeof AuthTypes

export interface IAuthForm {
    type: AuthType
}