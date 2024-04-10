import { ICartProduct } from "./cart";

export interface IOrderCreateRequest {
    products: ICartProduct['_id'][]
}

export interface IOrderResponse {
    _id: string,
    userId: string,
    orders: IOrderItem[]
}

interface IOrderItem {
    products: ICartProduct[],
    status: 0 | 1 | 2 | 3 | 4,
    created: string, //iso 8601
    _id: string,
}
