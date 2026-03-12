import type { T } from "vue-router/dist/router-CWoNjPRp.mjs";

interface IBaseApiResponse<T> {
    data?: T;
    status_code: number;
    message: string;
}

export type IApiResponse<T> = IBaseApiResponse<T>;

export class ApiResponse<T> implements IApiResponse<T> {
    data?: T;
    status_code: number;
    message: string;

    constructor(status_code: number, message: string, data?: T) {
        this.status_code = status_code;
        this.message = message;
        this.data = data;
    }

    static success<T>(message: string, data?: T): ApiResponse<T> {
        return new ApiResponse<T>(200, message, data);
    }

    static error<T>(message: string, data?: T): ApiResponse<T> {
        return new ApiResponse<T>(500, message, data);
    }

    get isSuccess(): boolean {
        return this.status_code === 200;
    }
}

export const getBaseResponse = <T>(response: IBaseApiResponse<T>): ApiResponse<T> => {
    return new ApiResponse<T>(response.status_code, response.message, response.data);
};