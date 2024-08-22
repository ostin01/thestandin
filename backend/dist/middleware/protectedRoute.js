"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = protectedRoute;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModels_1 = require("../models/userModels");
function protectedRoute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.jwt;
            if (!token) {
                return res
                    .status(401)
                    .json({ error: "Unauthorized , no Token provided" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ error: "Unauthorized , invalid Token" });
            }
            const id = decoded.id;
            const user = yield userModels_1.User.findById(id).select("password");
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user.id;
            next();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
