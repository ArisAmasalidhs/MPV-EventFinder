import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (userData, jwtToken) => {
    if (userData && jwtToken) {
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);
    } else {
      console.error("Invalid login data");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // Optional: Validate token or fetch user data on mount
    console.log("AuthContext initialized");
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
