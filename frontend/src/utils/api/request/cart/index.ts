import { RequestConfig } from "../../../../types/api";
import { IBook } from "../../../../types/book";
import { ICartResponse } from "../../../../types/cart";
import { api } from "../../instanse";

const CartRequest = {
    endpointName: '/cart',
    addToCart: async function(id: IBook["_id"]): RequestConfig<ICartResponse> {
        return api.post(this.endpointName, { id, quantity: 1});
    },
};

export {CartRequest}
