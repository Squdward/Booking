export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
}

export interface IToken {
    id: number,
    refreshToken: string,
}