import { useUnit } from "effector-react";
import { $addedToCart, addToCart } from "../../../../store/cart/model";
import { Button, ButtonProps } from "@mantine/core";
import { FC } from "react";
import { IBook } from "../../../../types/book";

const labels = ["Buy", "Added to Cart"];
const variant = ['primary', 'outline',]


interface IAddToCartButton {
    id: IBook['_id'],
}
const AddToCartButton: FC<IAddToCartButton & ButtonProps> = ({ id, ...restProps }) => {
    const [onCartAdd, addedToCart] = useUnit([addToCart, $addedToCart]);

    const onCartAddHandler = () => {
        onCartAdd(id);
    };

    const isAdded = addedToCart.has(id)
    const key = Number(isAdded);

    return (
        <Button variant={variant[key]} onClick={onCartAddHandler} {...restProps}>
            {labels[key]}
        </Button>
    );
};

export { AddToCartButton };
