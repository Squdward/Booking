import { IAuthor } from "./author";
import { IGenre } from "./genre";

export interface IBook {
    _id: string,
    title: string,
    description: string,
    img: string,
    price: number,
    author: IAuthor,
    genre: IGenre[]
}

export interface IBookStore extends IBook {
    inCart?: boolean,
}

export interface IBookCreate extends IBook {
    author: IAuthor['_id'],
    img: File
    genre: string,
}

interface IBookQueryParams {
    author: string,
    title: string,
    minPrice: number,
    maxPrice: number,
    genre: string | Array<string>
    page: string | number,
    limit: string | number,
}

export interface IBookResponse {
    books: IBook[],
    totalPages: string,
    currentPage: string,
}