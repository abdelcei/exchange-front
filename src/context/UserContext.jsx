import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  },[]);

  const logout = () => {

    console.log("logginOUT");

    localStorage.removeItem("user");
    setUser(null);
  };

  const login = (userData) => {
    console.log("login");
    console.log(userData);

    localStorage.setItem("user", userData.id);
    setUser(userData.id);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
