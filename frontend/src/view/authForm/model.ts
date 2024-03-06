import { attach, combine, createEffect, createEvent, createStore, sample, split } from "effector";
import { AuthType, IForm, IFormErrors, changeFieldType } from "./authForm";
import { AuthTypes, isValidaEmail, isValidaPassword } from "./config";
import { loginFx } from "../../utils/api/effects/login";

const DEFAULT_FORM: IFormErrors = {
    email: null,
    password: null,
    name: null
}

export const authFx = attach({effect: loginFx, mapParams: ({form}: {form: IForm}) => form})
export const registrFx = createEffect(async () => {
    console.log('registrFx')
});

//#region Authenification type 
export const changeType = createEvent<AuthType>('changeType');

const $endPointType = createStore<AuthType | null>(null)
.on(changeType, (_, payload) => payload)
//#endregion Authenification type 

//#region  Form Updates
export const changeFieldEvent = createEvent<changeFieldType>("changeField")
export const onSubmitEvent = createEvent('onSubmit');
export const $form = createStore<IForm>({
    email: "",
    password: "",
    name: "",
    // type: 'login',
}).on(changeFieldEvent, (store, payload) => ({...store, ...payload}))

//#endregion Form Updates

//#region  Form Errors
export const clearError = createEvent<keyof IFormErrors>('clearError')

export const $errors = createStore<IFormErrors>(DEFAULT_FORM)
.on(clearError, (store, name) => ({...store, [name]: null}))

const isValidForms = $errors.map(( errors) => Object.values(errors).every( field => field === null))
//#endregion  Form Errors


// Проверить на наличие ошибок : Готово 
// Если ошибки есть вывести их : Готово
// Если ошибок нет, отправить запроса на авторизацию\регистрацию: Готово
// Произвести редирект со страницы на которую пользователь пришел 
// Сохранить токен 

sample({
    clock: onSubmitEvent,
    source: $form,
    fn: (form) => {
        const erroObj = {...DEFAULT_FORM};

        if(!isValidaEmail(form.email)) erroObj.email = 'Неккоректный email'
        if(!isValidaPassword(form.password)) erroObj.password = 'Неккоректный пароль';
        // if(form.name) erroObj.name = 'Поле name указано неверно'

        return erroObj
    }, 
    target: $errors 
})

split({
    // source: $endPointType,
    source: combine({type: $endPointType, form: $form}),
    clock: onSubmitEvent,
    match: {
        [AuthTypes.login]: ({type, form}) => type === AuthTypes.login && form,
        [AuthTypes.register]: ({type, form}) => type === AuthTypes.register && form,
    },
    cases: {
        [AuthTypes.login]: authFx,
        [AuthTypes.register]: registrFx,
    },
})