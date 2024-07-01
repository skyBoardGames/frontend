import { io } from "socket.io-client";

const dev = "http://localhost:5657/chess";
const prod = "https://new-server-ozkr.onrender.com/chess";

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL, {
    autoConnect: false
});

export default socket;