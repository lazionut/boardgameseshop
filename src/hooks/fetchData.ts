import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Configs } from "../constants/Configs";

axios.defaults.baseURL = Configs.BASE_URL;
axios.defaults.timeout = Configs.REQUEST_TIMEOUT;

type RequestState = {
  data: any | any[];
  isLoading: boolean;
  error: any;
};

const useFetchData = (requestConfig: AxiosRequestConfig) => {
  const [requestState, setRequestState] = useState<RequestState>({
    data: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRequestState({
          ...requestState,
          isLoading: true,
        });

        const response = await axios(requestConfig);

        setRequestState({
          ...requestState,
          data: response.data,
          isLoading: false,
        });
      } catch (err) {
        setRequestState({
          ...requestState,
          error: err,
        });
      }
    };

    fetchData();
  }, []);

  return requestState;
};

export default useFetchData;
