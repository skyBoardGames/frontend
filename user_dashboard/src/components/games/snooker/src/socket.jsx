import { io } from "socket.io-client"

const dev = `http://localhost:5657/snooker`;
const prod = `https://new-server-ozkr.onrender.com/snooker`;

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL, {
    autoConnect: false
});

export default socket;