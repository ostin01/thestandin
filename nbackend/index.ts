import express, { Request, Response } from "express";

import dotenv from "dotenv";

import connectDB from "./config/DB";

import cookieParser = require("cookie-parser");

import { app, server } from "./socket/socket";

const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "standin-b4d56.appspot.com",
});

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
