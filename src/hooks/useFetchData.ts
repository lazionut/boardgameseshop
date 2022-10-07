import React, { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Configs } from "../constants/Configs";

axios.defaults.baseURL = String(Configs.BASE_URL);
axios.defaults.timeout = Number(Configs.REQUEST_TIMEOUT);

type RequestState = {
  data: { [key: string]: any };
  status: number;
  loading: boolean;
  error: any;
};

const useFetchData = (requestConfig: AxiosRequestConfig): any => {
  const [requestState, setRequestState] = useState<RequestState>({
    data: [],
    status: 0,
    loading: false,
    error: null,
  });

  console.log("Request config is: " + JSON.stringify(requestConfig));

  const fetchData = async () => {
    try {
      setRequestState({
        ...requestState,
        loading: true,
      });

      const response: AxiosResponse<any, any> = await axios(requestConfig);

      console.log("Response is: " + JSON.stringify(response));

      setRequestState({
        ...requestState,
        data: response.data,
        status: response.status,
        loading: false,
      });
    } catch (err) {
      const apiError = err as AxiosError;
      console.log(apiError.response?.data);

      setRequestState({
        ...requestState,
        error: JSON.stringify(apiError.response?.data),
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestConfig.url, JSON.stringify(requestConfig.data)]);

  return requestState;
};

export default useFetchData;
