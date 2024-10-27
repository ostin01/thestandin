"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080" || "thestandin.onrender.com");

export default function SocketIoConnection() {
  useEffect(() => {
    socket.emit("client_ready", "Hello from client");
  });
  return null;
}
