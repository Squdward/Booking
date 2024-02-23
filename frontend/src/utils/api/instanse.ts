import axios from "axios";
import { redirect } from "react-router-dom";
import { refreshToken } from "./request/refresh";


export const BASE_API_NAME = 'http://localhost:31299/api';

export const api = axios.create({
    baseURL: BASE_API_NAME,
    withCredentials: true
});

/**
 * Перехватывает запрос и вшивает токен в Headers
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;

    return config
})


/**
 * Перехватывает ответ от сервера 
 * Сохраняем данные о запросе 
 * Если статус ответа 401 - Unauthorized
 *  Тогда делаем запрос на обновление Пары токенов 
 *  Если при обновлении снова пришел 401 значит что-то пошло не так и мы редиректим пользователя на страницу логина
 */
api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const status = error.response ? error.response.status : null;
        const baseConfig = error.config 

        try {
            if(status == 401) {
                const response = await refreshToken({withCredentials: true})

                localStorage.setItem('token', response.data.accessToken);

                return api.request(baseConfig);
            }
        } catch (error) {
            if(error == 401) {
                redirect('/auth')
            }
        }
    }
)