import { Navigate } from "react-router-dom";

interface CostumerAuthenticatedRouteProps {
  children: JSX.Element;
}

const CostumerAuthenticatedRoute = ({
  children,
}: CostumerAuthenticatedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated === true ? children : <Navigate to={"/login"} />;
};

export default CostumerAuthenticatedRoute;
