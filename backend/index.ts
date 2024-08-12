import express, { Request, Response } from "express";

const app = express();

import dotenv from "dotenv";

import connectDB from "./config/DB";
import cookieParser = require("cookie-parser");

dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const admin = require("firebase-admin");

const serviceAccount = require("../standinbackend/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
connectDB();

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/api/users", require("./routes/userRoutes"));
