import { createEffect } from "effector"
import { BookRequest } from "../../request/book"
import { IBook, IBookQueryParams } from "../../../../types/book"

const BookEffects = {
    getBooks: createEffect(async (params?: Partial<IBookQueryParams>) => {
        const books = await BookRequest.getBooks(params);

        return books.data
    }),

    searchBook: createEffect(async (title: IBookQueryParams['title']) => {
        const searchResult = await BookRequest.search(title);

        return searchResult.data;
    }),

    getOneBook: createEffect(async (id: IBook['_id']) => {
        const request = await BookRequest.getOneBook(id);

        return request.data
    })
}

export {BookEffects}