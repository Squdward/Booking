import { IBookCreate } from "../../../../types/book";
import { api } from "../../instanse";

const BookRequest = {
    create: (body: IBookCreate) => api.post("book", body, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
};

export { BookRequest };
