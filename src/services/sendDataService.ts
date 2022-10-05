import axios, { AxiosError, AxiosResponse } from "axios";

interface SendDataProps {
  method: "get" | "post" | "patch" | "put" | "delete";
  url: string;
  headers: any;
  data: any;
}

const sendDataService = {
  async execute({ method, url, headers, data }: SendDataProps): Promise<any> {
    try {
      const response: AxiosResponse<any, any> = await axios[method](
        url,
        data,
        {headers},
      );

      console.log("Response to send data is: " + JSON.stringify(response));

      return response;
    } catch (error) {
      const apiError = error as AxiosError;
      console.log(apiError.response?.data);
    }
  },
};

export default sendDataService;
