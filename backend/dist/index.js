"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DB_1 = __importDefault(require("./config/DB"));
const cookieParser = require("cookie-parser");
const socket_1 = require("./socket/socket");
dotenv_1.default.config();
const PORT = process.env.PORT;
socket_1.app.use(express_1.default.json());
socket_1.app.use(express_1.default.urlencoded({ extended: false }));
socket_1.app.use(cookieParser());
(0, DB_1.default)();
socket_1.server.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
});
socket_1.app.get("/", (req, res) => {
    res.send("Hello world");
});
socket_1.app.use("/api/auth/", require("./routes/userRoutes"));
socket_1.app.use("/api/messages/", require("./routes/messageRoutes"));
socket_1.app.use("/api/users/", require("./routes/participantsRoutes"));
