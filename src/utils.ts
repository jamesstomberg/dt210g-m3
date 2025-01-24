import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { api } from './constants';

class ApiClient {
    private client: AxiosInstance;

    // Constructor for setting up base URL.
    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
        });

        // Add request interceptor.
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem(api.authTokenStorageKey); // Retrieve token from localStorage.

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`; // Set token in headers.
            }

            return config;
        });

        // Add response interceptor.
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('API Error:', error.response?.data || error.message);

                return Promise.reject(error);
            }
        );
    }

    // Generic GET method.
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    // Generic POST method.
    async post<T>(
        url: string,
        data: Record<string, unknown>,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    // Generic PUT method.
    async put<T>(
        url: string,
        data: Record<string, unknown>,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    // Generic DELETE method.
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }
}

// Export as singleton.
export const apiClient = new ApiClient(api.baseURL);

export async function apiPost<T>(url: string, data: Record<string, unknown>): Promise<T> {
    try {
        const response = await apiClient.post<T>(url, data);

        return response.data;
    } catch (error: any) {
        throw error;
    }
}
