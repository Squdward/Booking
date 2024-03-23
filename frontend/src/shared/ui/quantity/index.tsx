import { ActionIcon, NumberInput, NumberInputProps } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import styles from "./styles.module.scss";
import { FC } from "react";

interface IQuantity {
    value: number,
    onChange: (value: number) => void

}
const Quantity:FC<IQuantity> = ({ value, onChange }) => {
    const increment = () => {
        onChange(value + 1)
    };

    const decrement = () => {
        onChange(value > 0 ? value - 1 : 0)
    };

    const onChangeHandler:NumberInputProps['onChange'] = (v) => {
        onChange(+v)
    }   

    return (
        <div className={styles.quantity}>
            <ActionIcon onClick={decrement} className={styles.button}>
                <IconMinus />
            </ActionIcon>
            <NumberInput
                allowNegative={false}
                size="xs"
                className={styles.input}
                value={value}
                onChange={onChangeHandler}
                rightSection={" "}
            />
            <ActionIcon onClick={increment} className={styles.button}>
                <IconPlus />
            </ActionIcon>
        </div>
    );
};

export { Quantity };
