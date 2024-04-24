import { attach, createEvent, createStore, sample } from "effector";
import { OrderEffects } from "../../../../shared/api/effects/order";
import { IOrderItem } from "../../../../types/order";

const fetchOrders = attach({effect: OrderEffects.get})

export const getOrders = createEvent();

export const $orders = createStore<null | IOrderItem[]>(null);

sample({
    clock: getOrders,
    target: fetchOrders, 
})

sample({
    clock: fetchOrders.doneData,
    fn: (response) => {
        return response.orders
    },
    target: $orders,
})