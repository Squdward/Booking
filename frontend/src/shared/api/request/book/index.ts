import { RequestConfig } from "../../../../types/api";
import {
    IBook,
    IBookCreate,
    IBookQueryParams,
    IBookResponse,
} from "../../../../types/book";
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

    search: async (title: IBookQueryParams["title"]): RequestConfig<IBook[]> =>
        await api.get("/search", { params: { title, limit: 5 } }),

    getOneBook: async (id: IBook["_id"]): RequestConfig<IBook> => {
        return await api.get(`/book/${id}`);
    },
};

export { BookRequest };
