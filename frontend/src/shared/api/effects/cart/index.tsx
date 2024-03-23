import { createEffect } from "effector"
import { CartRequest } from "../../request/cart"
import { IBook } from "../../../../types/book";

const CartEffects = {
    addToCart: createEffect(async (bookId: IBook['_id']) => {
        const requst = await CartRequest.addToCart(bookId);
    
        return requst.data
    }),

    getCart: createEffect(async () => {
        const request = await CartRequest.getCart();
    
        return request.data
    })
}

export {CartEffects}