import { IBookStore } from "../../types/book";

export interface IBookCard extends IBookStore {
    onIconClick: (id) => void,
    className?: string,
}