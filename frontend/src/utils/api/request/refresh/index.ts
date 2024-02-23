import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_NAME } from "../../instanse";

export const refreshToken = async (config: AxiosRequestConfig) => axios.get(`${BASE_API_NAME}/refresh`, config)