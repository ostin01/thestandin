import express, { Request, Response } from "express";

import dotenv from "dotenv";

import connectDB from "./config/DB";

import cookieParser = require("cookie-parser");

import { app, server } from "./socket/socket";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

connectDB();

server.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/api/auth/", require("./routes/userRoutes"));
app.use("/api/messages/", require("./routes/messageRoutes"));
app.use("/api/users/", require("./routes/participantsRoutes"));
