import { RequestConfig } from "../../../../types/api";
import { IBook } from "../../../../types/book";
import { ICartResponse } from "../../../../types/cart";
import { api } from "../../instanse";

const CartRequest = {
    addToCart: async (id: IBook["_id"]): RequestConfig<ICartResponse> => {
        return api.post("/cart", { id, quantity: 1});
    },
};

export {CartRequest}
