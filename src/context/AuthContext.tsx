import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import jwt_decode from "jwt-decode";

type AuthToken = string | null;

type AccountDecoded = {
  [key: string]: any;
};

type AuthContextType = {
  authToken: AuthToken;
  accountDecoded: AccountDecoded | null;
};

const AuthContext = createContext({} as AuthContextType);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<AuthToken>(
    localStorage.getItem("token")
  );
  const [accountDecoded, setAccountDecoded] = useState<AccountDecoded | null>(
    null
  );

  useEffect(() => {
    if (authToken) {
      setAccountDecoded(jwt_decode(authToken));
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, accountDecoded }}>
      {children}
    </AuthContext.Provider>
  );
};
