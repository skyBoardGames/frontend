import { createContext, useState } from "react";
import { getUserDetails } from "../apiRequests/requestApi";

export const EmailContext = createContext();

export const EmailContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    wins: null,
    profile: null,
    bgClass: null,
    category: null,
    email: null,
    country: null,
    favGame: null,
    bio: null,
  });

  const getUser = async () => {
    try {
      const userDetails = await getUserDetails();
      setUser(userDetails);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EmailContext.Provider
      value={{
        user,
        setUser,
        getUser,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
