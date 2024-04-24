import { createEffect } from "effector";
import { OrderRequest } from "../../request/order";
import { IOrderCreateRequest } from "../../../../types/order";

const OrderEffects = {
    create: createEffect(async (body: IOrderCreateRequest) => {
        const request = await OrderRequest.create(body);

        request.data
    }),
    get: createEffect(async () => {
        const request = await OrderRequest.get();

        return request.data
    })
}

export {OrderEffects}