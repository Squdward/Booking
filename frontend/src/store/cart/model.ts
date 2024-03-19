import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { IBook } from "../../types/book";
import { $user } from "../user/model";
import { RouterConfig } from "../../pages";
import { notifications } from "@mantine/notifications";
import { CartEffects } from "../../shared/api/effects/cart";

export const addToCartFX = attach({effect: CartEffects.addToCart});
export const addToCart = createEvent<IBook['_id']>();

export const $addedToCart = createStore<Set<IBook['_id']>>(new Set());

//#region  Логика добавления товара в корзину 

// Если пользователь авторизован то пропускаем дальше
sample({
    clock: addToCart,
    source: $user,
    filter: (user) => {
        return Boolean(user?.isAuth)
    },
    fn: (_, payload) => {
        return payload
    },
    target: addToCartFX,
})

// Если пользователь не авторизован то редиректим
sample({
    clock: addToCart,
    source: $user,
    filter: (user) => {
        return Boolean(!user?.isAuth)
    },
    target: createEffect(() => {
        RouterConfig.navigate('/auth')
    }),
})

$addedToCart.on(addToCartFX.doneData, (store, payload) =>  {
    const clone = new Set(Array.from(store));

    clone.add(payload.product);

    return clone
})

//#region  Слушатели с сайд эффектами
addToCartFX.doneData.watch(() => {
    notifications.show({
        title: 'Success',
        message: "This product has been successfully added to your basket "
    })
})

addToCartFX.failData.watch(() => {
    notifications.show({
        title: 'Error',
        message: "Something went wrong. Try again or try again later"
    })
})
//#endregion Слушатели с сайд эффектами

//#endregion