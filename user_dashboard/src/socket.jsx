import { io } from "socket.io-client"

const dev = `http://localhost:5657/`;
// const dev = `http://127.0.0.1:3000/`;
// const dev = `http://192.168.8.100:3000/`;
const prod = `https://new-server-ozkr.onrender.com/`;

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL, {
    autoConnect: false
});

export default socket;