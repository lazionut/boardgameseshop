import React from "react";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/fetchData";

const Example = () => {
  const getCategoriesRequestConfig: AxiosRequestConfig = {
    url: "/categories",
    method: "GET",
  };

  const categories = useFetchData(getCategoriesRequestConfig);

  return (
    <>
      {categories.data.map((category: any, index: number) => (
        <div key={index}>
          <h1>{category.id}</h1>
          <h2>{category.name}</h2>
        </div>
      ))}
    </>
  );
};

export default Example;
