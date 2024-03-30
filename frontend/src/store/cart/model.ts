import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { IBook } from "../../types/book";
import { $user } from "../user/model";
import { RouterConfig } from "../../pages";
import { notifications } from "@mantine/notifications";
import { CartEffects } from "../../shared/api/effects/cart";
import { ICartProduct, ICartResponse } from "../../types/cart";
import { debug } from "patronum";

//#region  Логика добавления товара в корзину 
export const addToCartFX = attach({effect: CartEffects.addToCart});
export const addToCart = createEvent<IBook['_id']>(); 

export const $addedToCart = createStore<Set<ICartProduct['product']>>(new Set());


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

//#region Логика удаления товара из корзины
export const removeFromCartFX = attach({effect: CartEffects.removeFromCart});
export const removeFromCart = createEvent<ICartProduct['_id']>();

sample({
    clock: removeFromCart,
    target: removeFromCartFX,
})
//#endregion

//#region Логика под страницу Cart
const getCartFX = attach({effect: CartEffects.getCart})
const patchCartFX = attach({effect: CartEffects.patchCart})


const getCart = createEvent();
export const changeQuantity = createEvent<{productId: ICartProduct['_id'], quantity: number}>()
export const $cart = createStore<ICartResponse['products'] | null>(null);

export const $selectedProduct = createStore<ICartProduct['_id'][]>([])
export const selectProduct = createEvent<ICartProduct['_id']>();
$selectedProduct.on(selectProduct, (store, id) => {
    const clone = [...store];

    const productIndex = clone.findIndex( item => item === id);

    if(productIndex !== -1) {
        clone.splice(productIndex, 1);
    } else {
        clone.push(id)
    }

    return clone
})

sample({
    clock: changeQuantity,
    fn: (payload) =>({productId: payload.productId, quantity: payload.quantity}),
    target: patchCartFX,
})

sample({
    clock: getCart,
    target: getCartFX
})

sample({
    clock: [getCartFX.doneData, removeFromCartFX.doneData, patchCartFX.doneData],
    fn: (data) => {
        return data.products
    },
    target: $cart
})

export const cartLoader = () => {
    getCart();

    return null
}
//#endregion

debug($selectedProduct)