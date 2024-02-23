import { RequestConfig } from "../../../../types/api";
import { IBook, IBookCreate } from "../../../../types/book";
import { api } from "../../instanse";

const BookRequest = {
    create: (body: IBookCreate) => api.post('book', body)  
}

export {BookRequest}