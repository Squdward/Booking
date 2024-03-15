import { IBookStore } from "../../types/book";

export interface IBookCard extends IBookStore {
    onButtonClick: (id) => void,
    onIconClick: (id) => void     
}