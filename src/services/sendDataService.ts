import axios, { AxiosError, AxiosResponse } from "axios";

interface SendDataProps {
  method: "post" | "patch" | "put" | "delete";
  url: string;
  headers: any;
  data?: any;
}

const sendDataService = {
  async execute({ method, url, headers, data }: SendDataProps): Promise<any> {
    try {
      let response: AxiosResponse<any, any>;

      if (data !== undefined) {
        response = await axios[method](url, data, {
          headers,
        });
      } else {
        response = await axios[method](url, {
          headers,
        });
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
