import axios from "axios";
import { getBaseResponse } from "../../shared/types/baseApi";

export const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
);