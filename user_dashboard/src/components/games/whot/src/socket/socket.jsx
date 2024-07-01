import { io } from "socket.io-client";
// const socket = io("https://whot.onrender.com/");
// const socket = io("http://localhost:8080");

const dev = "http://localhost:5657/whot";
const prod = "https://new-server-ozkr.onrender.com/whot";

const socket = io(process.env.NODE_ENV == "development" ? dev : prod, {
    autoConnect: false
});

export default socket;