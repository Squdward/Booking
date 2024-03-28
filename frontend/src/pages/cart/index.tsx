import { useUnit } from "effector-react";
import { CartEmpty } from "../../view/Cart/CartEmpty";
import { CartForm } from "../../view/Cart/CartForm/ui";
import { CartList } from "../../view/Cart/CartList";
import { $cart } from "../../store/cart/model";
import styles from "./styles.module.scss";

const CartPage = () => {
    const [data] = useUnit([$cart]);

    const isVisible = data && data.length > 0;

    return (
        <div>
            <section className={styles.section}>
                {!isVisible && <CartEmpty />}
                {isVisible && (
                    <>
                        <h1>Корзина {data.length}</h1>
                        <div className={styles.container}>
                            <CartList products={data} />
                            <CartForm />
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export { CartPage };
