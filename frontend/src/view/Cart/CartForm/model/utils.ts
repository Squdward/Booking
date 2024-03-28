export const DELIVERY_TYPE_OPTIONS = [
    {
        label: "Самовывоз",
        value: "1"
    },
    {
        label: "Доставка",
        value: "2"
    },
]

export const SHOP_ADRES_OPTIONS = [
    {
        label: "ул. Карла Либкнехта 118-122",
        value: "1",
    },
    {
        label: "ул. Гебелева 5-3",
        value: "2",
    },
    {
        label: "улица Румянцева 14-16",
        value: "3",
    },
]

export const PAYMENT_TYPE = [
    {
        label: "При получении",
        value: "1"
    },
    {
        disabled: true,
        label: "Онлайн",
        value: "2"
    }
]

export const initialState = {
    name: "",
    secondName: "",
    phone: "",
    type: null,
    deliveryShop: "",
    deliveryAdres:"",
    payment: null,
}

export const initialErrors = {
    name: null,
    secondName: null,
    phone: null,
    type: null,
    deliveryShop: null,
    deliveryAdres:null,
    payment: null,
}