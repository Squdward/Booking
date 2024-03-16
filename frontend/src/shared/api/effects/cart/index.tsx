import { createEffect } from "effector"
import { CartRequest } from "../../request/cart"
import { IBook } from "../../../../types/book";

const CartEffects = {
    addToCart: createEffect(async (bookId: IBook['_id']) => {
        const requst = await CartRequest.addToCart(bookId);
    
        return requst.data
    })
}

export {CartEffects}