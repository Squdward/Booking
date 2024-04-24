import { attach, createEvent, createStore, sample } from "effector";
import { IErrorState, IForm, IOnChange } from ".";
import { initialState, initialErrors } from "./utils";
import { debug, every } from "patronum";
import { $selectedProduct } from "../../../../store/cart/model";
import { OrderEffects } from "../../../../shared/api/effects/order";

export const submitFx = attach({effect: OrderEffects.create});

export const onFormChange = createEvent<IOnChange>();
export const onSubmit = createEvent();
export const clearFormError = createEvent<keyof IErrorState>();

export const $form = createStore<IForm>(initialState)
export const $formErrors = createStore<IErrorState>(initialErrors);

export const $hasErrors = every({predicate: (store) => Boolean(store), stores: [$formErrors]})

$form.on(onFormChange, (store, {name, value}) => ({...store, [name]: value}))
$formErrors.on(clearFormError, (store, name) => ({...store, [name]: null}))

sample({
    clock:onSubmit,
    source: $form,
    fn: (store) => {
        const formErrors:IErrorState = {...initialErrors};

    if(store.name.trim().length < 2) {
        formErrors.name = '"Имя" введено некорректно. Поле "имя" должно быть больше 2х символов'
    } 


    if(store.secondName.trim().length < 4) {
        formErrors.secondName = '"Фамилия" введена некорректно. Поле "Фамилия" должно быть больше 4х символов'
    }
    
    if(store.phone.toString().length < 6 &&  store.phone.toString().length < 13 ) {
        formErrors.phone = 'Телефон введен некорректно. Длина должна быть не меньше 6 символов и не больше 13'
    }

    if(store.type === '1') {
        if(!store.deliveryShop) {
            formErrors.deliveryShop = 'Выберите тип доставки'
        }
    } else if (store.type === '2') {
        if(!store.deliveryAdres) {
            formErrors.deliveryAdres = 'Выберите тип доставки'
        }
    } else {
        formErrors.type = 'Выберите тип доставки'
    }

    if(!store.payment) {
        formErrors.payment = 'Выберите тип оплаты'
    }

    return formErrors

    },
    target: $formErrors,
})


sample({
    clock: onSubmit,
    source: {errors:$hasErrors, form: $form, products: $selectedProduct},
    filter: ({errors, products}) => {
        console.log({errors: errors, products, })
        return errors && products.length <= 0
    },
    target: submitFx
})