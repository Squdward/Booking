import { attach, createEvent, createStore, sample } from "effector";
import { IBook } from "../../types/book";
import { notifications } from "@mantine/notifications";
import { BookEffects } from "../../utils/api/effects/book";
import { debug } from "patronum";

const getBooksFX = attach({effect: BookEffects.getBooks});
export const fetchBooks = createEvent();
export const $books = createStore<IBook[] | null>(null);

$books.on(getBooksFX.doneData, (_, payload) => payload);

getBooksFX.failData.watch( () => {
    notifications.show({
        title: "Default title",
        message: "Error happend"
    })
})

sample({
    clock: fetchBooks,
    target: getBooksFX
})

debug($books)
