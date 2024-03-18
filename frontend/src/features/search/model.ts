import { notifications } from "@mantine/notifications";
import { attach, createEvent, createStore, sample } from "effector";
import { BookEffects } from "../../shared/api/effects/book";
import { debug, debounce } from "patronum";

const onSearchFx = attach({effect: BookEffects.searchBook})

export const searchChange = createEvent<string>();
const debounced = debounce(searchChange, 350);

// const $search = createStore('');
export const $searchResult = createStore<{
    label: string,
    value: string,
}[] | null>(null)
export const $isLoading = createStore(false);

$searchResult.reset(searchChange), 

sample({
    clock: debounced,
    filter: (value) => Boolean(value.trim()),
    target: onSearchFx,
})

sample({
    clock: onSearchFx.pending, 
    fn: () => true,
    target: $isLoading
})

sample({
    clock: onSearchFx.doneData,
    fn: (res) => {
        return res.map( item => {
            return {
                label: item.title,
                value: item._id
            }
        })
    },
    target: $searchResult,
})

sample({
    clock: onSearchFx.finally, 
    fn: () => false,
    target: $isLoading
})

onSearchFx.failData.watch(() => {
    notifications.show({
        title: "Errors",
        message: "Error happend",
    })
})


debug($searchResult)