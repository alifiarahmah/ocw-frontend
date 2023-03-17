import { TOKEN_ACCESS_KEY, TOKEN_REFRESH_KEY } from "@/constants";
import { HttpResponse } from "@/types/HttpResponse";
import axios from "axios";
import { unsetToken } from "./token";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

http.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem(TOKEN_ACCESS_KEY);
 
    if (accessToken) {
      /*config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };*/
      config.headers.setAuthorization(`Bearer ${accessToken}`);
    }
 
    return config;
  },
  (config) => Promise.reject(config)
);
 
http.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (axios.isAxiosError(err)) {
      const config = err.config as any;
      if (
        (err.response?.status == HttpResponse.Unauthorized ||
          err.response?.status == HttpResponse.UnprocessableEntity) &&
        config.url === "/auth/refresh"
      ) {
        unsetToken();
      }
 
      if (
        err.response?.status == HttpResponse.Unauthorized &&
        !config?.sent &&
        config.url !== `/auth/refresh`
      ) {
        const refreshKey = localStorage.getItem(TOKEN_REFRESH_KEY);
 
        if (refreshKey) {
          try {
            const {
              data: { data },
            } = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
              undefined,
              {
                headers: {
                  authorization: `Bearer ${refreshKey}`,
                },
              }
            );
 
            const newToken = data.token.access as string;
            sessionStorage.setItem(TOKEN_ACCESS_KEY, newToken);
 
            config.sent = true;
            config.headers = {
              ...config.headers,
              authorization: `Bearer ${newToken}`,
            };
          } catch (errNew) {
            if (axios.isAxiosError(errNew)) {
              if (
                errNew.response?.status == HttpResponse.Unauthorized ||
                errNew.response?.status == HttpResponse.UnprocessableEntity
              ) {
                unsetToken();
              }
            }
 
            return Promise.reject(err);
          }
 
          const result = await axios(config);
          return result;
        } else {
          sessionStorage.removeItem(TOKEN_ACCESS_KEY);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default http;