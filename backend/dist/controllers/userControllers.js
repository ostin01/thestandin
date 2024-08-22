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
exports.signup = signup;
exports.login = login;
exports.logoutUser = logoutUser;
const userModels_1 = require("../models/userModels");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../middleware/generateToken"));
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, email, password } = req.body;
        try {
            const existingUser = yield userModels_1.User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ error: "User already exists" });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            const user = yield userModels_1.User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            if (user) {
                (0, generateToken_1.default)(user._id.toString(), res);
                return res.status(201).json({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: user.password,
                });
            }
            else {
                return res.status(400).json({ mssg: "Invalid user data" });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield userModels_1.User.findOne({ email });
            const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (!user || !isPasswordCorrect)
                return res.status(400).json({ message: "Invalid login credentials" });
            res.status(200).json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: (0, generateToken_1.default)(user._id.toString(), res),
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.cookie("jwt", "", { maxAge: 0 });
            res.status(200).json({ message: "User logged out successfully" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
