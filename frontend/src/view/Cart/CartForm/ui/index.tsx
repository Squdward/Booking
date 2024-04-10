import { Button, Input, NumberInput, Select } from "@mantine/core";
import { CURRENCY } from "../../../../shared/constant";
import {
    DELIVERY_TYPE_OPTIONS,
    PAYMENT_TYPE,
    SHOP_ADRES_OPTIONS,
} from "../model/utils";
import styles from "./styles.module.scss";
import { useUnit } from "effector-react";
import { $form, $formErrors, clearFormError, onFormChange, onSubmit } from "../model/model";
import { IErrorState, IForm } from "../model";

const TYPE = {
    '1': (state:IForm, onChange: (a:string, b:IForm[keyof IForm]) => void, errors: IErrorState, onFocus: (v: keyof IErrorState) => void) => (
        <Input.Wrapper error={errors.deliveryShop}>
            <Select
                value={state.deliveryShop}
                onChange={(value) => onChange('deliveryShop', value)}
                name="deliveryShop"
                placeholder="Выберите магазин"
                data={SHOP_ADRES_OPTIONS}
                onFocus={() => onFocus('deliveryShop')}
            />
        </Input.Wrapper>
    ),
    '2': (state:IForm, onChange: (a:string, b:IForm[keyof IForm]) => void, errors: IErrorState, onFocus: (v: keyof IErrorState) => void) => (
        <Input.Wrapper error={errors.deliveryAdres}>
            <Input
                value={state.deliveryAdres}
                onChange={(e) => onChange('deliveryAdres', e.target.value)}
                name="deliveryAdres"
                placeholder="Введите ваш адрес"
                onFocus={() => onFocus('deliveryAdres')}
            />
        </Input.Wrapper>
    ),
}

const CartForm = () => {
    const [state, onChange, onFormSubmit, errors, onFocus] = useUnit([$form, onFormChange, onSubmit, $formErrors, clearFormError]);
    
    const onChangeHandler = (n:string, value:IForm[keyof IForm]) => {
        // Todo 
        // Костыль 
        const name = n as keyof IForm;

        onChange({name, value})
    }

    return (
        <div className={styles.form}>
            <Input.Wrapper error={errors.name}>
                <Input
                    value={state.name}
                    onChange={(event) =>  onChangeHandler(event.target.name, event.target.value)}
                    name="name"
                    placeholder="Имя"
                    onFocus={() => onFocus('name')}
                />
            </Input.Wrapper>

            <Input.Wrapper error={errors.secondName}>
                <Input
                    value={state.secondName}
                    onChange={(event) =>  onChangeHandler(event.target.name, event.target.value)}
                    name="secondName"
                    placeholder="Фамилия"
                    onFocus={() => onFocus('secondName')}

                />
            </Input.Wrapper>

            <Input.Wrapper error={errors.phone}>
                <NumberInput
                    value={state.phone}
                    onChange={(value) =>  onChangeHandler('phone', value)}
                    defaultValue={"+375"}
                    name="phone"
                    placeholder="+375 XX XXX XX XX"
                    onFocus={() => onFocus('phone')}
                />
            </Input.Wrapper>

            <Input.Wrapper error={errors.type}>
                <Select
                    value={state.type}
                    onChange={(value) =>  onChangeHandler('type', value)}
                    name={"type"}
                    placeholder="Выберите тип доставки"
                    data={DELIVERY_TYPE_OPTIONS}
                    onFocus={() => onFocus('type')}
                />
            </Input.Wrapper>

            {state.type && TYPE[state.type](state, onChangeHandler, errors, onFocus)}

            <Input.Wrapper error={errors.payment}>
                <Select
                    value={state.payment}
                    onChange={(value) =>  onChangeHandler('payment', value)}
                    name="payment"
                    placeholder="Выбертие тип оплаты"
                    data={PAYMENT_TYPE}
                    onFocus={() => onFocus('payment')}
                />
            </Input.Wrapper>
            <p>Цена: 150{CURRENCY}</p>
            <Button onClick={onFormSubmit}>Оплатить</Button>
        </div>
    );
};

export { CartForm };
