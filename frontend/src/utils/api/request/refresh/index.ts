import { AxiosRequestConfig } from "axios";
import { api } from "../../instanse";
import { RequestConfig, TypeAccesToken } from "../../../../types/api";
import { IUser } from "../../../../types/user";

export interface RefreshTokenConfig {
    user: Omit<IUser, "password">
    accesToken: TypeAccesToken
}

export type RefreshConfig = RequestConfig<RefreshTokenConfig>


export const refreshToken = async (config?:AxiosRequestConfig):RefreshConfig => api.get(`/refresh`, {
    withCredentials: true,
    ...config,
})
// export const refreshToken = async (config = DEFAULT_CONFIG):RefreshConfig => axios.get(`${BASE_API_NAME}/refresh`, config)