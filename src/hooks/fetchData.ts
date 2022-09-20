import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Configs } from "../constants/Configs";

axios.defaults.baseURL = Configs.BASE_URL;
axios.defaults.timeout = Configs.REQUEST_TIMEOUT;

type RequestState = {
  data: any | any[];
  loading: boolean;
  error: any;
};

const useFetchData = (requestConfig: AxiosRequestConfig) => {
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

        const response = await axios(requestConfig);

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
  }, []);

  return requestState;
};

export default useFetchData;
