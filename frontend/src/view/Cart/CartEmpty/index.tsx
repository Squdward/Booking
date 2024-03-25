import Icon from "../../../assets/Cart/emptyCart.svg?react";
import styles from "./index.module.scss";

const CartEmpty = () => {
    return (
        <div className={styles.empty}>
            <Icon/>
            <h1>Nothing found</h1>
        </div>
    )
}

export {CartEmpty}