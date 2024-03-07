import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { AuthType, IForm, IFormErrors, changeFieldType } from "./authForm";
import { AuthTypes, isValidaEmail, isValidaPassword } from "./config";
import { loginFx, registerFx } from "../../utils/api/effects/login";
import { userLogin } from "../../features/user/model";
import { redirect } from "react-router-dom";

const DEFAULT_FORM: IFormErrors = {
    email: null,
    password: null,
    name: null,
};

export const authFx = attach({ effect: loginFx });
export const registrFx = attach({ effect: registerFx });

//#region Authenification type
export const changeType = createEvent<AuthType>("changeType");

const $endPointType = createStore<AuthType | null>(null).on(
    changeType,
    (_, payload) => payload
);
//#endregion Authenification type

//#region  Form Updates
export const changeFieldEvent = createEvent<changeFieldType>("changeField");
export const onSubmitEvent = createEvent("onSubmit");
export const $form = createStore<IForm>({
    email: "",
    password: "",
    name: "",
    // type: 'login',
}).on(changeFieldEvent, (store, payload) => ({ ...store, ...payload }));

//#endregion Form Updates

//#region  Form Errors
export const clearError = createEvent<keyof IFormErrors>("clearError");

export const $errors = createStore<IFormErrors>(DEFAULT_FORM).on(
    clearError,
    (store, name) => ({ ...store, [name]: null })
);

const $isValidForms = $errors.map((errors) =>
    Object.values(errors).every((field) => field === null)
);
//#endregion  Form Errors

// Проверить на наличие ошибок : Готово
// Если ошибки есть вывести их : Готово
// Если ошибок нет, отправить запроса на авторизацию\регистрацию: Готово
// Сохранить токен : Готово
// Произвести редирект со страницы на которую пользователь пришел
// Починить типы 

sample({
    clock: onSubmitEvent,
    source: { form: $form, endPointType: $endPointType },
    fn: ({ form, endPointType }) => {
        const erroObj = { ...DEFAULT_FORM };

        if (!isValidaEmail(form.email)) erroObj.email = "Неккоректный email";
        if (!isValidaPassword(form.password))
            erroObj.password = "Неккоректный пароль";
        if (endPointType === AuthTypes.register && form.name?.trim() === "")
            erroObj.name = "Поле name указано неверно";

        return erroObj;
    },
    target: $errors,
});

sample({
    clock: onSubmitEvent,
    source: {
        form: $form,
        isValid: $isValidForms,
        endPointType: $endPointType,
    },
    filter: ({ endPointType, isValid }) =>
        endPointType === AuthTypes.login && isValid,
    fn: ({ form }) => ({ email: form.email, password: form.password }),
    target: loginFx,
});

sample({
    clock: onSubmitEvent,
    source: {
        form: $form,
        isValid: $isValidForms,
        endPointType: $endPointType,
    },
    filter: ({ endPointType, isValid }) =>
        endPointType === AuthTypes.register && isValid,
    fn: ({ form }) => form,
    target: registrFx,
});


// sample({
//     clock: authFx.pending,
//     fn: () => {
//         console.log('pending')
//     }
// })

authFx.pending.watch((response) => {
    console.log('response', response)
})

authFx.done.watch((response) => {
    console.log('done', response)
})

authFx.doneData.watch((response) => {
    console.log('doneData', response)
})

authFx.finally.watch((response) => {
    console.log('finally', response)
})

// sample({
//     clock: [authFx.done, registerFx.done],
//     fn: (val) => {
//         console.log('values', val)
//     },
//     target: userLogin
// })

// sample({
//     clock: [authFx.finally, registerFx.finally],
//     target: createEffect(() => {
//         redirect('/')
//     })
// })