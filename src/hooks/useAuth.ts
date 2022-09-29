import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface Account {
  accountData: {
    details: string;
    city: string;
    county: string;
    country: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

export interface Login {
  loginData: {
    email: string;
    password: string;
  };
}

const authenticationService = {
  async register({ accountData }: Account): Promise<any> {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        "/accounts/register",
        accountData
      );

      if (response.data?.token !== undefined) {
        localStorage.setItem("token", response.data.token);
      }

      return response;
    } catch (error) {
      const apiError = error as AxiosError;
      console.log(apiError.response?.data);
    }
  },

  async login({ loginData }: Login): Promise<any> {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        "/accounts/login",
        loginData
      );

      if (response.data?.token !== undefined) {
        localStorage.setItem("token", response.data.token);
      }

      return response;
    } catch (error) {
      const apiError = error as AxiosError;
      console.log(apiError.response?.data);
    }
  },

  logout() {
    localStorage.removeItem("token");
  },
};

export default authenticationService;
