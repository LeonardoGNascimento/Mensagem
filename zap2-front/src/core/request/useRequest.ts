import { HttpAdapter } from "./Http.adapter";

export function useRequest(request: HttpAdapter, baseUrl: string = "") {
  async function post(url: string, body?: any, config?: any) {
    return await request.post(`${baseUrl}${url}`, body, config);
  }

  async function get(url: string, config?: any) {
    return await request.get(`${baseUrl}${url}`, config);
  }

  return { post, get };
}
