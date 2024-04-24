import { attach, combine, createEvent, createStore, sample } from "effector";
import { EventType } from "./types";
import { UserEffects } from "../../../../shared/api/effects/user";
import { IUser } from "../../../../types/user";

const initialErrors: Record<keyof Omit<IUser, 'id'>, null | string> = {
    name: null,
    secondName: null,
    phone: null,
    password: null,
    email: null,
    adres: null,
}

export const submitData = attach({effect: UserEffects.patch});
export const getUser = attach({effect: UserEffects.get})

export const changeEvent = createEvent<EventType>();
export const onSubmit = createEvent();

export const $errors = createStore(initialErrors);

export const $settings = createStore<Omit<IUser, 'id'>>({
    name: '',
    secondName: "",
    phone: "",
    password: '',
    email: '',
    adres: '',
}); 

export const $isDirty = createStore(false);

export const $hasErrors = combine($errors, (errors) => {
    return Object.values(errors).every( item => item === null);
})

$isDirty.on(changeEvent, () => true)
$settings.on(changeEvent, (state, {name, value}) => ({...state, [name]: value}));


sample({
    clock: getUser.doneData,
    target: $settings 
})

sample({
    clock: onSubmit,
    source: {data: $settings},
    fn: ({data}) => {
        const errors = {...initialErrors};

        if(data.name && data.name.trim().length < 2) {
            errors.name = 'Имя слишком короткое '
        }
        
        if(data.secondName && data.secondName.trim().length < 4) {
            errors.secondName = 'Фамилия слишком короткая'
        }

        if(data.phone && data.phone.trim().length <= 12) {
            errors.phone = 'Телефон указан неверно'
        }

        if(data.password && data.password.trim().length < 5 ) {
            errors.password = 'Пароль слишком короткий'
        }

        if(data.email && !data.email.includes('@')) {
            errors.email = 'Неверно указана почта';
        }

        if(data.adres && data.adres.trim().length < 8 ) {
            errors.adres = 'Неверно указан адрес'
        } 

        return errors
    },
    target: $errors
})

sample({
    clock: onSubmit,
    source: {data: $settings},
    filter: () => $hasErrors.getState(),
    fn: ({data}) => {return {name: data.name}}, 
    target:submitData
})