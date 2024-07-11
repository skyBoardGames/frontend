import { createContext, useState } from "react";
import { getRequest } from "../../components/apiRequests";
export const GamesContext = createContext();

export const GamesContextProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [makeTournament, setMakeTournament] = useState({});

  const getGames = async () => {
    try {
      const response = await getRequest("/games");
      console.log(response);

      if (!response.data) {
        setGames(null);
      }

      const data = response.data;

      const newArray = data.map(({ image, _id, name, description, maxPlayers }) => ({
        _id,
        id: name?.toLowerCase(),
        img: image,
        caption: `Play ${name} with friends`,
        bgClass: "bg-2796CE",
        title: name,
        arrowColor: "#2796CE",
        text: description,
        splitTitle1: name,
        maxPlayers,
        splitTitle2: "Game",
      }));

      setGames(newArray);

      console.log(newArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTournaments = async () => {
    try {
      const response = await getRequest("/celebrity/tournaments");
      console.log(response);

      if (!response.data) {
        setTournaments(null);
      }

      const data = response.data;

      setTournaments(data);

      console.log(tournaments);

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GamesContext.Provider
      value={{
        tournaments,
        getTournaments,
        games,
        getGames,
        loading,
        makeTournament,
        setMakeTournament,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
