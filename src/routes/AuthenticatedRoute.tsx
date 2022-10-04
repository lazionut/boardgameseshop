import React from "react";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }: any) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated === true ? children : <Navigate to={"/error"} />;
};

export default AuthenticatedRoute;
