import { useUnit } from "effector-react";
import { CartEmpty } from "../../view/Cart/CartEmpty";
import { CartForm } from "../../view/Cart/CartForm";
import { CartList } from "../../view/Cart/CartList";
import { $cart } from "../../store/cart/model";

const CartPage = () => {
    const [data] = useUnit([$cart]);

    const isVisible = data && data.length > 0;

    return (
        <div>
            <section>
                {!isVisible && <CartEmpty />}
                {isVisible && (
                    <>
                        <CartList products={data} />
                        <CartForm />
                    </>
                )}
            </section>
        </div>
    );
};

export { CartPage };
