import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const CostumerAuthenticatedRoute = ({ children }: any) => {
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;

  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }

  return accountDecoded?.Role === "Admin" ? children : <Navigate to={"/error"} />;
};

export default CostumerAuthenticatedRoute;
