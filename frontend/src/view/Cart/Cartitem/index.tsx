import { ActionIcon, Checkbox, Image } from "@mantine/core"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./styles.module.scss";
import { BASE_FILE_URL, CURRENCY } from "../../../shared/constant";
import { Quantity } from "../../../shared/ui/quantity";
import { FavoriteButton } from "../../../features/favorite/ui/favoriteButton";
import { IconTrash } from "@tabler/icons-react";
import { ICartProduct } from "../../../types/cart";

const CartItem:FC<ICartProduct> = ({product, quantity}) => {
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
                    <Quantity value={+quantity} onChange={() => console.log('hey')}/>
                    <FavoriteButton/>
                    <ActionIcon variant="default" radius="md" size={36}>
                        <IconTrash stroke={1.5}/>
                    </ActionIcon>
                </div>
            </div>
            <div className={styles.extra}><Checkbox/></div>
        </div>
    )
}

export {CartItem}