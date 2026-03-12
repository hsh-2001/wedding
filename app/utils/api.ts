import axios from "axios";
import { getBaseResponse } from "../../shared/types/baseApi";

export const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => {
        if (response.data && typeof response.data === "object") {
            if (
                typeof response.data.status_code === "number" &&
                typeof response.data.message === "string"
            ) {
                return response.data;
            }
            return getBaseResponse(200, "Success", response.data);
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            if (
                typeof error.response.data.status_code === "number" &&
                typeof error.response.data.message === "string"
            ) {
                return Promise.reject(error.response.data);
            }
            return Promise.reject(
                getBaseResponse(500, "Error", error.response.data)
            );
        }
        return Promise.reject(getBaseResponse(500, "Unknown error"));
    }
);