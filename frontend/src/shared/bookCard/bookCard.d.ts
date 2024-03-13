import { IBook } from "../../types/book";

export interface IBookCard extends IBook {
    onButtonClick: () => void,
    onIconClick: () => void     
}