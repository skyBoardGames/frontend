import { io } from "socket.io-client";

// const dev = `http://localhost`;
const dev = `https://skyboardgames.com`;
const prod = "https://skyboardgames.com";

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL + '/chess', {
    autoConnect: false,
    path: '/games/socket.io'
});

export default socket;