import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  async function authenticateUser() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5005/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

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
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContextWrapper;
