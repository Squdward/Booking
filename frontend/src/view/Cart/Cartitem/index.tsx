import { Checkbox, Image } from "@mantine/core"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./styles.module.scss";
import { BASE_FILE_URL, CURRENCY } from "../../../shared/constant";
import { Quantity } from "../../../shared/ui/quantity";
import { FavoriteButton } from "../../../features/favorite/ui/favoriteButton";
import { ICartProduct } from "../../../types/cart";
import { DeleteFromCartButton } from "../../../features/cart/ui/deleteFromCart";
import { useUnit } from "effector-react";
import { changeQuantity } from "../../../store/cart/model";

const CartItem:FC<ICartProduct> = ({product, quantity, _id}) => {
    const onChange  = useUnit(changeQuantity);

    const onChangeHandler = (value: number) => {
        onChange({productId: _id, quantity: value})
    }
    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <Image className={styles.image} src={`${BASE_FILE_URL}${product.img}`}/>
            </div>

            <div className={styles.info}>
                <Link className={styles.title} to={`/book/${product._id}`}>{product.title}</Link>
                <Link className={styles.author} to={`/author/${product.author._id}`}>{product.author.fullName}</Link>
               
                <span className={styles.price}>{product.price}{CURRENCY}</span>
       
                <div className={styles.actions}>
                    <Quantity value={+quantity} minValue={1} onChange={onChangeHandler}/>
                    <FavoriteButton/>
                    <DeleteFromCartButton productId={_id} />
                </div>
            </div>
            <div className={styles.extra}><Checkbox/></div>
        </div>
    )
}

export {CartItem}