interface ICartProducts {
    product: string,
    quantity: string,
    _id: string,
}

export interface ICartResponse {
    products: ICartProducts[],
    userId: string,
    _id: string,
}