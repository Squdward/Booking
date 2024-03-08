import { attach, createEvent, createStore, sample } from "effector";
import { AuthType, IForm, IFormErrors, changeFieldType } from "./authForm";
import { AuthTypes, isValidaEmail, isValidaPassword } from "./config";
import { loginFx, registerFx } from "../../utils/api/effects/login";
import { userLogin } from "../../store/user/model";
import { notifications } from "@mantine/notifications";
import axios from "axios";

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


// Проверям на наличие ошибок
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

// Отправляем на авторизацию
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
    target: authFx,
});

// Отправляем на регистрацию
sample({
    clock: onSubmitEvent,
    source: {
        form: $form,
        isValid: $isValidForms,
        endPointType: $endPointType,
    },
    filter: ({ endPointType, isValid }) =>
        endPointType === AuthTypes.register && isValid,
    fn: ({ form }) => form as Required<IForm>,
    target: registrFx,
});

// Передаем данные в UserLogin
sample({
    clock: [authFx.doneData, registerFx.doneData],
    target: userLogin
})

// Обрабатываем ошибку 
authFx.fail.watch(error => {
    if(axios.isAxiosError(error.error)) {
        const errorMessage = error.error?.response?.data?.message ?? 'Unknow error';

        notifications.show({
            title: 'Error',
            message: errorMessage,
            autoClose: false,
        })
    } 

    console.error(error.error)
})