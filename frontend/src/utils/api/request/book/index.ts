import { RequestConfig } from "../../../../types/api";
import { IBook, IBookCreate, IBookQueryParams } from "../../../../types/book";
import { api } from "../../instanse";

const BookRequest = {
    create: (body: IBookCreate) =>
        api.post("book", body, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
    getBooks: async (
        params?: Partial<IBookQueryParams>
    ): RequestConfig<IBook[]> => await api.get("/book", { params }),
};

export { BookRequest };
