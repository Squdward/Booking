import { createEffect } from "effector"
import { CartRequest } from "../../request/cart"
import { IBook } from "../../../../types/book";
import { ICartProduct } from "../../../../types/cart";

const CartEffects = {
    addToCart: createEffect(async (bookId: IBook['_id']) => {
        const requst = await CartRequest.addToCart(bookId);
    
        return requst.data
    }),

    getCart: createEffect(async () => {
        const request = await CartRequest.getCart();
    
        return request.data
    }),

    removeFromCart: createEffect(async (productId: ICartProduct['_id']) => {
        const request = await CartRequest.removeFromCart(productId);

        return request.data
    }),

    patchCart: createEffect(async({productId, quantity}: {productId: ICartProduct['_id'], quantity: number}) => {
        const request = await CartRequest.editCart(productId, quantity);

        return request.data
    })
}

export {CartEffects}