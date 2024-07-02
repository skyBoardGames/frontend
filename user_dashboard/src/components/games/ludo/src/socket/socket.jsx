import { io } from "socket.io-client";

// const dev = "http://localhost:5657/ludo";
// const prod = "https://new-server-ozkr.onrender.com/ludo";

const dev = `http://skyboardgames.com`;
const prod = "http://skyboardgames.com";

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL + '/ludo', {
    autoConnect: false,
    path: '/games/socket.io'
});

export default socket;