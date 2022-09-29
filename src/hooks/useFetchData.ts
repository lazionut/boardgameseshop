import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Configs } from "../constants/Configs";

axios.defaults.baseURL = String(Configs.BASE_URL);
axios.defaults.timeout = Number(Configs.REQUEST_TIMEOUT);

type RequestState = {
  data: any | any[];
  loading: boolean;
  error: any;
};

const useFetchData = (requestConfig: AxiosRequestConfig): any => {
  const [requestState, setRequestState] = useState<RequestState>({
    data: [],
    loading: false,
    error: null,
  });

  console.log(requestConfig);

  const fetchData = async () => {
    if (requestConfig.url !== undefined) {
      console.log("Intra2");

      try {
        setRequestState({
          ...requestState,
          loading: true,
        });

        const response: AxiosResponse<any, any> = await axios(requestConfig);

        setRequestState({
          ...requestState,
          data: response.data,
          loading: false,
        });
      } catch (err) {
        setRequestState({
          ...requestState,
          error: err,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestConfig.url, JSON.stringify(requestConfig.data)]);

  return [requestState, fetchData] as const;
};

export default useFetchData;
