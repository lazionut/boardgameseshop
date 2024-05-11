import axios, { AxiosError, AxiosResponse } from "axios";

import { setupInterceptor } from "../config/Interceptor";

interface SendDataProps {
  method: "post" | "patch" | "put" | "delete";
  url: string;
  data?: any;
}

const sendDataService = {
  async execute({ method, url, data }: SendDataProps): Promise<any> {
    try {
      const customAxiosInstance = setupInterceptor(axios.create());

      let response: AxiosResponse<any, any>;

      if (data !== undefined) {
        response = await customAxiosInstance[method](url, data);
      } else {
        response = await customAxiosInstance[method](url);
      }

      console.log("Response to send data is: " + JSON.stringify(response));

      return response;
    } catch (error) {
      const apiError = error as AxiosError;
      console.log(apiError.response?.data);

      return apiError.response?.data;
    }
  },
};

export default sendDataService;
