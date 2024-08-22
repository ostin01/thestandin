"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
exports.io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});
exports.io.on("connnection", (socket) => {
    console.log("a user connected", socket);
    socket.on("disconnected", () => {
        console.log("user disconnected", socket.id);
    });
});
