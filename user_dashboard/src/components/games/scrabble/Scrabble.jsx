import "./style.css";
import SGame from "./SGame";
import { useEffect } from "react";
import socket from "./socket";

export default function Scrabble() {
    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <>
            <SGame />
        </>
    )
}