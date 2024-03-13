import { RequestConfig } from "../../../../types/api";
import { IBookCreate, IBookQueryParams, IBookResponse } from "../../../../types/book";
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
    ): RequestConfig<IBookResponse> => await api.get("/book", { params }),
};

export { BookRequest };
