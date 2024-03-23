import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { IAuthor } from "../../types/author";
import { AuthorEffects } from "../../shared/api/effects/author";
import { notifications } from "@mantine/notifications";
import { LoaderFunctionArgs } from "react-router-dom";

const getAuthorFX = attach({effect: AuthorEffects.getOne})

const getAuthor = createEvent<IAuthor['_id']>();

export const $author = createStore<IAuthor | null>(null);

export const $isLoading = createStore(false);
$isLoading.on(getAuthorFX.pending, () => true);
$isLoading.on(getAuthorFX.finally, () => false);

sample({
    clock: getAuthor,
    target: getAuthorFX,
})

sample({
    clock:getAuthorFX.doneData,
    target: $author
})

sample({
    clock: getAuthorFX.failData,
    target: createEffect(() => {
        notifications.show({
            title: "Errors",
            message: "Error happend",
        })
    })
})

export const AuthorLoader = ({params}: LoaderFunctionArgs) => {
    const {id} = params;

    if(id === undefined) return null;
    
    getAuthor(id);

    return null
}