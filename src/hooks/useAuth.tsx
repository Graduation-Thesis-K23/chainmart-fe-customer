import React, { useState, useEffect, useContext, createContext } from "react";
import jwt_decode from "jwt-decode";

import useCookie from "./useCookie";

interface UserInfo {
  username: string;
  email: string;
  name: string;
  role: string;
}

const AuthContext = createContext<UserInfo | false>(false);

export const AuthProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | false>(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const decoded: UserInfo = jwt_decode(useCookie("access_token", ""));
      setUser(decoded);
    } catch (error) {
      document.cookie =
        "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'";
      setUser(false);
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
