import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  // Load user from localStorage on first render
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          email: "",
          fullname: {
            firstname: "",
            lastname: "",
          },
        };
  });

  // Wrap setUser to persist to localStorage too
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Optional: clear function for logout
  const clearUser = () => {
    setUser({
      email: "",
      fullname: {
        firstname: "",
        lastname: "",
      },
    });
    localStorage.removeItem("user");
  };

  return (
    <UserDataContext.Provider
      value={{ user, setUser: updateUser, updateUser, clearUser }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
