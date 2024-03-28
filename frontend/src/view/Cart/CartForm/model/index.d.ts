export interface IForm {
    name: string,
    secondName: string,
    phone: string | number,
    type: '1' | '2' | null,
    deliveryShop: string,
    deliveryAdres: string,
    payment: '1' | '2' | null,
}

export interface IOnChange {
    name: keyof IForm,
    value:  IForm[keyof IForm],
}

export type IErrorState = Record<string, string | null> 

export type ISelectKeys = 'type'  | 'payment';

