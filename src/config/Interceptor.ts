import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  return config;
};

export const setupInterceptor = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest);

  return axiosInstance;
};
