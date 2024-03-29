import { FC } from "react";
import { ICartResponse } from "../../../types/cart";
import { CartItem } from "../Cartitem";
import styles from "./styles.module.scss";

interface ICartlist {
    products: ICartResponse['products'],
}

const CartList:FC<ICartlist> = ({products}) => {
    return (
        <div className={styles.list}>
            <h1>Корзина {products.length}</h1>
            {products.map( item => {
                return (
                    <CartItem key={item._id} {...item}/>
                )
            })}
        </div>
    )
}

export {CartList};