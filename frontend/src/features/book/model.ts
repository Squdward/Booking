import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { IBook } from "../../types/book";
import { notifications } from "@mantine/notifications";
import { debug } from "patronum";
import { BookEffects } from "../../shared/api/effects/book";
import { LoaderFunctionArgs } from "react-router-dom";

const getBookFX = attach({effect: BookEffects.getOneBook})
const getBook = createEvent<IBook['_id']>();

export const $bookData = createStore<IBook | null>(null);
export const $isLoading = createStore(false);

sample({
    clock: getBook,
    target: getBookFX,
})


sample({
    clock: getBookFX.pending,
    fn: () =>  true,
    target: $isLoading,
})

sample({
    clock: getBookFX.failData,
    target: createEffect(() => {
        notifications.show({
            title: 'Error title',
            message: "Error was happend"
        })
    })
})

sample({
    clock: getBookFX.doneData,
    target: $bookData,
})

sample({
    clock: getBookFX.finally,
    fn: () =>  false,
    target: $isLoading,
})

export const bookByIdLoader = ({params}: LoaderFunctionArgs) => {
    const {id} = params
    
    if(id !== undefined) {
        getBook(id);
    }

    return null;
}

debug($isLoading)