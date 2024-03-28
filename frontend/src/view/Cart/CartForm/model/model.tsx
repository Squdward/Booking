import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { IErrorState, IForm, IOnChange } from ".";
import { initialState, initialErrors } from "./utils";
import { debug, every } from "patronum";

export const submitFx = attach({effect: createEffect()});

export const onFormChange = createEvent<IOnChange>();
export const onSubmit = createEvent();

export const $form = createStore<IForm>(initialState)
export const $formErrors = createStore<IErrorState>(initialErrors);

export const $hasErrors = every({predicate: (store) => Boolean(store), stores: [$formErrors]})

$form.on(onFormChange, (store, {name, value}) => ({...store, [name]: value}))

sample({
    clock:onSubmit,
    source: $form,
    fn: (store) => {
        const formErrors:IErrorState = initialErrors;

    if(store.name.trim() === '') {
        formErrors.name = 'Test'
    } 

    if(store.secondName.trim() === '') {
        formErrors.secondName = 'Test 2'
    }
    
    if(store.phone.toString().length < 6 &&  store.phone.toString().length > 13 ) {
        formErrors.phone = 'Test 3'
    }

    if(store.type === '1') {
        if(!store.deliveryShop) {
            formErrors.deliveryShop = 'Test 4'
        }
    } else if (store.type === '2') {
        if(!store.deliveryAdres) {
            formErrors.deliveryAdres = 'Test 5'
        }
    }

    if(!store.payment) {
        formErrors.payment = 'Test 6'
    }

    return formErrors

    },
    target: $formErrors,
})

sample({
    clock: onSubmit,
    source: {errors:$hasErrors, form: $form},
    filter: ({errors}) => errors,
    target: submitFx
})