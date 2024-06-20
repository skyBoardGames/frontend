import { createContext, useState } from "react";
import { getRequest } from "../../components/apiRequests";
export const GamesContext = createContext();

export const GamesContextProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGames = async () => {
    try {
      const response = await getRequest("/games");
      console.log(response);

      if (!response.data) {
        setGames(null);
      }

      const data = response.data;

      const newArray = data.map(({ image, _id, name, description }) => ({
        _id,
        id: name?.toLowerCase(),
        img: image,
        caption: `Play ${name} with friends`,
        bgClass: "bg-2796CE",
        title: name,
        arrowColor: "#2796CE",
        text: description,
        splitTitle1: name,
        splitTitle2: "Game",
      }));

      setGames(newArray);

      console.log(newArray);

      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        getGames,
        loading,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
