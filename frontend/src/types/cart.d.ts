import { IBook } from "./book";

interface ICartResponse {
    _id: string,
    userId: string,
    products: ICartProduct[],
}

export interface ICartProduct {
    product: IBook,
    quantity: string,
    _id: string
}