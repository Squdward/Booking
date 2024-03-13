import { attach, createEvent, createStore, sample } from "effector";
import { IBook } from "../../types/book";
import { notifications } from "@mantine/notifications";
import { BookEffects } from "../../utils/api/effects/book";
import { IPagination } from "../../types/pagination";


const getBooksFX = attach({ effect: BookEffects.getBooks });

export const fetchBooks = createEvent();
export const setPage = createEvent<number>();

export const $books = createStore<IBook[] | null>(null);
export const $pagination = createStore<IPagination>({
    page: "1",
    limit: "12",
    totalPages: "1",
});

$books.on(getBooksFX.doneData, (_, payload) => payload.books);

$pagination.on(getBooksFX.doneData, (store, payload) => ({
    ...store,
    page: payload.currentPage,
    totalPages: payload.totalPages,
}));

$pagination.on(setPage, (store, payload) => ({ ...store, page: payload }));

getBooksFX.failData.watch(() => {
    notifications.show({
        title: "Default title",
        message: "Error happend",
    });
});

sample({
    clock: fetchBooks,
    source: $pagination,
    target: getBooksFX,
});

sample({
    clock: setPage,
    source: $pagination,
    filter: (pagination, payload) => pagination.page == payload, // View не имеет возможности не вызывать onChange если кнопка уже выбрана, приходится делать это на стороне бизне-логика BAD PRACTICE
    fn: (pagination) => {
        return { limit: pagination.limit, page: pagination.page };
    },
    target: getBooksFX,
});
