import React, { createContext, useState, useEffect } from "react";
import service from "../service/service.js";

export const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  async function authenticateUser() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await service.get("/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }

  const values = {
    user,
    setUser,
    authenticateUser,
    isLoggedIn,
    isLoading,
    logOutUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContextWrapper;
