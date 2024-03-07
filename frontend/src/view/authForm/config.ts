import { IForm } from "./authForm";

export const AuthTypes = {
    register: 'register',
    login: 'login'
} as const;


export const TextContent = {
    links: {
        [AuthTypes.register]: '/auth',
        [AuthTypes.login]: '/register',
    },
    content: {
        [AuthTypes.register]: 'Уже есть аккаунт? Вход',
        [AuthTypes.login]: "Нет аккаунта? Регистрация",
    }
}

export const isValidaEmail = (email:IForm['email']) => {
    return email.includes('@') && email.trim().length > 4;
}

export const isValidaPassword = (password: IForm['password']) => {
    return password.trim().length > 4
}