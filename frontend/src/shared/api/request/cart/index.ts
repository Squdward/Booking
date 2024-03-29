import { RequestConfig } from "../../../../types/api";
import { IBook } from "../../../../types/book";
import { ICartProduct, ICartResponse } from "../../../../types/cart";
import { api } from "../../instanse";

const CartRequest = {
    endpointName: '/cart',
    addToCart: async function(id: IBook["_id"]): RequestConfig<ICartProduct> {
        return api.post(this.endpointName, { id, quantity: 1});
    },
    getCart: async function():RequestConfig<ICartResponse> {
        return api.get(this.endpointName);
    },

    removeFromCart: async function(productId: ICartProduct['_id']):RequestConfig<ICartResponse> {
        return api.delete(`${this.endpointName}/${productId}`)
    },

    editCart: async function(productId: ICartProduct['_id'], quantity: number,):RequestConfig<ICartResponse> {
        return api.patch(`${this.endpointName}`, { productId, quantity })
    }
};

export {CartRequest}
