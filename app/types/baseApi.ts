interface IBaseApiResponse<T> {
    data?: T;
    status_code: number;
    message: string;
}

export type IApiResponse<T> = IBaseApiResponse<T>;

export class ApiResponse<T> implements IBaseApiResponse<T> {
    data?: T;
    status_code: number;
    message: string;

    constructor(data: T | undefined, status_code = 200 , message =  'success') {
        this.status_code = status_code;
        this.message = message;
        this.data = data;
    }

    static success<T>(message: string, data: T): ApiResponse<T> {
        return new ApiResponse<T>(data, 200, message);
    }

    static error<T>(message: string, data?: T): ApiResponse<T> {
        return new ApiResponse<T>(data, 500, message);
    }

    get isSuccess(): boolean {
        return this.status_code === 200;
    }
}

export const getBaseResponse = <T>(response: IBaseApiResponse<T>): ApiResponse<T> => {
    return new ApiResponse<T>(response.data, response.status_code, response.message);
};
