import axios, { AxiosInstance } from "axios";
import { HttpResponse } from "./HttpResponse";

export class AxiosRequest {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create();

    this.api.interceptors.request.use(async (config: any) => {
      const token = localStorage.getItem("@token");

      if (token) {
        const headers = { Authorization: `Bearer ${token}`, ...config.headers };
        config.headers = headers;
      }
      return config;
    });
  }

  async get<T>(url: string, config: any): Promise<HttpResponse<T>> {
    const { data } = await this.api.get(url, config);

    return new HttpResponse<T>(data, 1, false);
  }

  async post<T>(url: string, body: any, config: any): Promise<HttpResponse<T>> {
    try {
      const { data, status } = await this.api.post(url, body, config);

      return new HttpResponse(data, status, false);
    } catch (e: any) {
      return new HttpResponse(e.response.data, e.response.status, true);
    }
  }

  async patch<T>(url: string, body: any, config: any): Promise<HttpResponse<T>> {
    const { data } = await this.api.patch(url, body, config);

    return new HttpResponse(data, 1, false);
  }

  async put<T>(url: string, body: any, config: any): Promise<HttpResponse<T>> {
    const { data } = await this.api.put(url, body, config);

    return new HttpResponse(data, 1, false);
  }
}
