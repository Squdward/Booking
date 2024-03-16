import { createEffect } from "effector";
import { GenreRequest } from "../../request/genre";

const GenresEffects = {
    getAll: createEffect(async () => {
        const request = await GenreRequest.getAll();

        return request.data
    })
}

export {GenresEffects}