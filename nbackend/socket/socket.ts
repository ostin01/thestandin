import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "thestandin.vercel.app"],
    methods: ["GET", "POST"],
  },
});
const userSocketMap: Record<string, string> = {};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (typeof userId === "string" && userId !== "undefined")
    userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnected", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("client_ready", (data) => {
    console.log(data);
  });
});
