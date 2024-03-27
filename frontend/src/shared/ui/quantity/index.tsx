import { ActionIcon, NumberInput, NumberInputProps } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import styles from "./styles.module.scss";
import { FC } from "react";

interface IQuantity {
    value: number,
    onChange: (value: number) => void,
    minValue?: number,
}

const Quantity:FC<IQuantity> = ({ value, onChange, minValue = 1}) => {
    const increment = () => {
        onChange(value + 1)
    };

    const decrement = () => {
        if(value > minValue) {
            onChange(value - 1)
        }
    };

    const onChangeHandler:NumberInputProps['onChange'] = (v) => {
        if(+v > minValue) { 
            onChange(+v)
        }
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
                min={minValue}
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
