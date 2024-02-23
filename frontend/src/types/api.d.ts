import { AxiosResponse } from "axios";

type RequestConfig<T> = Promise<AxiosResponse<T>>;

export type TypeAccesToken = string; 