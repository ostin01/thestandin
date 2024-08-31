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

io.on("connnection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnected", () => {
    console.log("user disconnected", socket.id);
  });
});
