import { createContext, useState } from "react";
import { getRequest } from "../../components/apiRequests/requestApi";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [codeToken, setCode] = useState("");

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/auth/profile");
      const userDetails = response ? response.data : null

      return userDetails;

    } catch (error) {
      console.error(error);
      // throw error;

    } finally {
      setLoading(false);
    }
  };

  const setUserDetails = (details) => {
    setUser(details);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserDetails,
        getUser,
        codeToken,
        setCode,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
