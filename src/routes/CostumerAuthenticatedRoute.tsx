import { Navigate } from "react-router-dom";

const CostumerAuthenticatedRoute = ({ children }: any) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated === true ? children : <Navigate to={"/login"} />;
};

export default CostumerAuthenticatedRoute;
