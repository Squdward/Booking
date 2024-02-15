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

export interface IAuthor {
    id: number,
    name: string,
}

export interface ITag {
    id: number,
    name: string
}

export interface IGoods {
    id: number,
    author: IAuthor['id'] | IAuthor,
    title: string,
    description: string,
    img: string,
    tags: ITag['id'][] | ITag[]
    year: number,
    price: number
}