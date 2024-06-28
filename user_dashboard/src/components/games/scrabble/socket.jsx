import { io } from "socket.io-client"

const dev = `http://localhost:3000/scrabble`;
const prod = `https://new-server-ozkr.onrender.com/scrabble`;

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL, {
    autoConnect: false
});

export default socket;