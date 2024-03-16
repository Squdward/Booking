import axios, { AxiosResponse } from "axios";
import { RefreshTokenConfig } from "./request/refresh";
import { Token } from "./tokens";
import { unauthUser } from "../../store/user/model";


export const BASE_API_NAME = 'http://localhost:31299/api';

export const api = axios.create({
    baseURL: BASE_API_NAME,
    withCredentials: true
});

/**
 * Перехватывает запрос и вшивает токен в Headers
 */
api.interceptors.request.use((config) => {
    const token = Token.getToken();

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
                const response: AxiosResponse<RefreshTokenConfig> = await axios.get(`${BASE_API_NAME}/refresh`, {withCredentials: true})

                Token.setToken(response.data.accesToken)

                return api.request(baseConfig);
            }
        } catch (error) {
            if(axios.isAxiosError(error) && error?.response?.status == 401) {
                unauthUser();

                // redirect('/auth')

            }
        }

        return Promise.reject(error);
    }
)