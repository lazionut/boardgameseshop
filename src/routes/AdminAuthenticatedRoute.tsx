import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Constants } from "../constants/Constants";

const AdminAuthenticatedRoute = ({ children }: any) => {
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;
  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }

  return accountDecoded?.Role === Constants.ADMIN ? (
    children
  ) : (
    <Navigate to={"/error"} />
  );
};

export default AdminAuthenticatedRoute;
