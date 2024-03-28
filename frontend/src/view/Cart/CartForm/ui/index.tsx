import { Button, Input, NumberInput, Select } from "@mantine/core";
import { CURRENCY } from "../../../../shared/constant";
import {
    DELIVERY_TYPE_OPTIONS,
    PAYMENT_TYPE,
    SHOP_ADRES_OPTIONS,
} from "../model/utils";
import styles from "./styles.module.scss";
import { useUnit } from "effector-react";
import { $form, onFormChange } from "../model/model";
import { IForm } from "../model";

const TYPE = {
    '1': (state:IForm, onChange: (a:string, b:IForm[keyof IForm]) => void) => (
        <Input.Wrapper>
            <Select
                value={state.deliveryShop}
                onChange={(value) => onChange('delivery', value)}
                name="deliveryShop"
                placeholder="Выберите магазин"
                data={SHOP_ADRES_OPTIONS}
            />
        </Input.Wrapper>
    ),
    '2': (state:IForm, onChange: (a:string, b:IForm[keyof IForm]) => void) => (
        <Input.Wrapper>
            <Input
                value={state.deliveryAdres}
                onChange={(e) => onChange('delivery', e.target.value)}
                name="deliveryAdres"
                placeholder="Введите ваш адрес"
            />
        </Input.Wrapper>
    ),
}

const CartForm = () => {
    const [state, onChange] = useUnit([$form, onFormChange]);

    const onChangeHandler = (n:string, value:IForm[keyof IForm]) => {
        // Todo 
        // Костыль 
        const name = n as keyof IForm;

        onChange({name, value})
    }
    return (
        <div className={styles.form}>
            <Input.Wrapper>
                <Input
                    value={state.name}
                    onChange={(event) =>  onChangeHandler(event.target.name, event.target.value)}
                    name="name"
                    placeholder="Имя"
                />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input
                    value={state.secondName}
                    onChange={(event) =>  onChangeHandler(event.target.name, event.target.value)}
                    name="secondName"
                    placeholder="Фамилия"
                />
            </Input.Wrapper>

            <Input.Wrapper>
                <NumberInput
                    value={state.phone}
                    onChange={(value) =>  onChangeHandler('phone', value)}
                    defaultValue={"+375"}
                    name="phone"
                    placeholder="Телефон"
                />
            </Input.Wrapper>

            <Input.Wrapper>
                <Select
                    value={state.type}
                    onChange={(value) =>  onChangeHandler('type', value)}
                    name={"type"}
                    placeholder="Выберите тип доставки"
                    data={DELIVERY_TYPE_OPTIONS}
                />
            </Input.Wrapper>

            {state.type && TYPE[state.type](state, onChangeHandler)}

            <Input.Wrapper>
                <Select
                    value={state.payment}
                    onChange={(value) =>  onChangeHandler('payment', value)}
                    name="payment"
                    placeholder="Выбертие тип оплаты"
                    data={PAYMENT_TYPE}
                />
            </Input.Wrapper>
            <p>Цена: 150{CURRENCY}</p>
            <Button>Оплатить</Button>
        </div>
    );
};

export { CartForm };
