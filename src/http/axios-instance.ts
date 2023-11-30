import Axios, {
    AxiosError,
    AxiosInstance as AxiosType,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import {STORAGE_AUTHORIZE_KEY} from "@/composables/authorization.ts";

export interface ResponseBody<T = any> {
    code: number;
    data?: T;
    msg: string;
}

async function requestHandler(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const token = localStorage.getItem(STORAGE_AUTHORIZE_KEY);
    if (token) {
        config.headers[STORAGE_AUTHORIZE_KEY] = token;
    }
    return config;
}

function responseHandler(response: AxiosResponse<ResponseBody>): AxiosResponse<ResponseBody> {
    // 响应拦截器逻辑...
    return response;
}

function errorHandler(error: AxiosError<ResponseBody>): Promise<AxiosError<ResponseBody>> {
    // 错误处理逻辑...
    return Promise.reject(error);
}

class AxiosInstance {
    private readonly instance: AxiosType;

    constructor(baseURL: string) {
        this.instance = Axios.create({baseURL});

        this.instance.interceptors.request.use(requestHandler, errorHandler);
        this.instance.interceptors.response.use(responseHandler, errorHandler);
    }

    public getInstance(): AxiosType {
        return this.instance;
    }
}

const baseURL = import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:8080';
export const axiosInstance = new AxiosInstance(baseURL).getInstance();
