import { Navigate } from "react-router-dom";

import { Constants } from "../constants/Constants";
import { useAuthContext } from "../context/AuthContext";

interface AdminAuthenticatedRouteProps {
  children: JSX.Element;
}

const AdminAuthenticatedRoute = ({
  children,
}: AdminAuthenticatedRouteProps) => {
  const { accountDecoded } = useAuthContext();

  return accountDecoded?.Role === Constants.ADMIN ? (
    children
  ) : (
    <Navigate to={"/error"} />
  );
};

export default AdminAuthenticatedRoute;
