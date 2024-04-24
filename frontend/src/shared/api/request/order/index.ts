import { RequestConfig } from "../../../../types/api";
import { IOrderCreateRequest, IOrderResponse } from "../../../../types/order";
import { api } from "../../instanse";

class OrderRequest {
    static async create(body: IOrderCreateRequest): RequestConfig<IOrderResponse> {
        return await api.post('/order', {body: body})
    }

    static async get(): RequestConfig<IOrderResponse> {
        return await api.get('/order')
    }
}

export {OrderRequest}