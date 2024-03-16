import { attach, createEvent, createStore, sample } from "effector";
import { IBook, IBookQueryParams } from "../../types/book";
import { notifications } from "@mantine/notifications";
import { BookEffects } from "../../utils/api/effects/book";
import { IPagination } from "../../types/pagination";
import { LoaderFunctionArgs } from "react-router-dom";

const getBooksFX = attach({ effect: BookEffects.getBooks });

export const fetchBooks = createEvent();
export const setPage = createEvent<number>();
export const setFilter = createEvent<Partial<IBookQueryParams>>();

export const $books = createStore<IBook[] | null>(null);
export const $pagination = createStore<IPagination>({
    page: "1",
    limit: "8",
    totalPages: "1",
});
const $filter = createStore<Partial<IBookQueryParams> | null>(null)

$books.on(getBooksFX.doneData, (_, payload) => payload.books);

$pagination.on(getBooksFX.doneData, (store, payload) => ({
    ...store,
    page: payload.currentPage,
    totalPages: payload.totalPages,
}));
$pagination.on(setPage, (store, payload) => ({ ...store, page: payload }));
$pagination.reset(setFilter)

$filter.on(setFilter, (store, payload) => ({...store, ...payload}));

getBooksFX.failData.watch(() => {
    notifications.show({
        title: "Default title",
        message: "Error happend",
    });
});

/**
 * Главный катализатор запроса данных 
 */
sample({
    clock: [fetchBooks, setFilter, setPage],
    source: {pagination: $pagination, filter: $filter},
    fn: ({pagination, filter}) => {
        return {...pagination, ...filter}
    },
    target: getBooksFX,
});

export const BookLoader = ({params}:LoaderFunctionArgs) => {
    const {id} = params

    id ? setFilter({genre: id}) : fetchBooks();

    return null;
}