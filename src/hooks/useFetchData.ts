import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Configs } from "../constants/Configs";

axios.defaults.baseURL = String(Configs.BASE_URL);
axios.defaults.timeout = Number(Configs.REQUEST_TIMEOUT);

type RequestState = {
  data: any | any[];
  loading: boolean;
  error: any;
};

const useFetchData = (requestConfig: { [key: string]: string }) => {
  const [requestState, setRequestState] = useState<RequestState>({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [requestConfig.url]);

  return requestState;
};

export default useFetchData;
