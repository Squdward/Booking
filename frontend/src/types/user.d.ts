export interface IUser {
    id: string,
    email: string,
    password: string,
    name?: string,
    secondName?: string,
    phone?: string,
    adres?: string,
}

export type IUserView = Omit<IUser, 'password'>

export interface IUserStore extends IUserView {
    isAuth: boolean
} 