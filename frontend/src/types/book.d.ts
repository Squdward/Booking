import { IAuthor } from "./author";
import { IGenre } from "./genre";

export interface IBook {
    title: string,
    description: string,
    img: string,
    price: number,
    author: IAuthor,
    genre: IGenre | IGenre[]
}

export interface IBookCreate extends IBook {
    author: IAuthor['_id'],
    img: File
    genre: string,
}