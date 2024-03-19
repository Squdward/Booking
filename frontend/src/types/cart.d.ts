import { IBook } from "./book";

interface ICartProducts {
    product: string,
    quantity: string,
    _id: string,
}

export interface ICartResponse {
    product: IBook['_id'],
    quantity: string,
    _id: string
}