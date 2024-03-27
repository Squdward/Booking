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
    }),

    removeFromCart: createEffect(async (productId: ICartProduct['_id']) => {
        const request = await CartRequest.removeFromCart(productId);

        return request.data
    }),
    
        return request.data
    })
}

export {CartEffects}