export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
}

export interface IToken {
    userId: number,
    refreshToken: string,
}