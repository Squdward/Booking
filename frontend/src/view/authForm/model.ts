import { createEffect, createEvent, createStore, sample } from "effector";
import { IForm, changeFieldType } from "./authForm";

export const fx = createEffect(async (values) => {
    console.log('fx', values)
})

export const changeFieldEvent = createEvent<changeFieldType>("changeField")

export const onSubmitEvent = createEvent('onSubmit');

export const $form = createStore<IForm>({
    email: "",
    password: "",
    name: "",
});

$form.on(changeFieldEvent, (store, payload) => ({...store, ...payload}))

sample({
    clock: onSubmitEvent,
    source: $form,
    target: fx
})