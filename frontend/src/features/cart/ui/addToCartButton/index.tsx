import { useUnit } from "effector-react";
import { $addedToCart, addToCart } from "../../../../store/cart/model";
import { Button, ButtonProps } from "@mantine/core";
import { FC } from "react";
import { IBook } from "../../../../types/book";

const labels = ["Buy", "Added to Cart"];
const variant = ['primary', 'outline',]


interface IAddToCartButton {
    id: IBook['_id'],
    inCart?: IBook['inCart'],
}
const AddToCartButton: FC<IAddToCartButton & ButtonProps> = ({ id, inCart = false, ...restProps }) => {
    const [onCartAdd, addedToCart] = useUnit([addToCart, $addedToCart]);

    const onCartAddHandler = () => {
        onCartAdd(id);
    };

    /**
     * Товар может быть добавлен после нажатия
     * Или же находится в корзине когда мы рендеримся
     */
    const isAddedToCart = addedToCart.has(id); 
    const isAdded = isAddedToCart || inCart

    const key = Number(isAdded);

    return (
        <Button variant={variant[key]} onClick={onCartAddHandler} {...restProps}>
            {labels[key]}
        </Button>
    );
};

export { AddToCartButton };
