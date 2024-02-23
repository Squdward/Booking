import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_NAME } from "../../instanse";
import { RequestConfig, TypeAccesToken } from "../../../../types/api";
import { IUser } from "../../../../types/user";

interface RefreshTokenConfig {
    user: Omit<IUser, "password">
    accesToken: TypeAccesToken
}

type RefreshConfig = RequestConfig<RefreshTokenConfig>


export const refreshToken = async (config?: AxiosRequestConfig):RefreshConfig => axios.get(`${BASE_API_NAME}/refresh`, config)