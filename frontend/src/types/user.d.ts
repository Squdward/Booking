export interface IUser {
    id: string,
    email: string,
    password: string,
}

export type IUserView = Omit<IUser, 'password'>

export interface IUserStore extends IUserView {
    isAuth: boolean
} 