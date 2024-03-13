import { createEffect } from "effector"
import { BookRequest } from "../../request/book"
import { IBookQueryParams } from "../../../../types/book"

const BookEffects = {
    getBooks: createEffect(async (params?: Partial<IBookQueryParams>) => {
        const books = await BookRequest.getBooks(params);

        return books.data.books
    }),
}

export {BookEffects}