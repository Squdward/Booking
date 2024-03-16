import { attach, createEvent, createStore, sample } from "effector";
import { IGenre } from "../../../types/genre";
import { GenresEffects } from "../../api/effects/genres";

const getGenresFX = attach({effect: GenresEffects.getAll})
export const getGenres = createEvent();

export const $sidebarLinks = createStore<IGenre[] | null>(null);

sample({
    clock: getGenres,
    target: getGenresFX,
})

sample({
    clock: getGenresFX.doneData,
    target: $sidebarLinks
})