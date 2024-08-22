"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: {
        type: String,
        require: [true, "please add an Email"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "please add a password"],
        minLength: 6,
    },
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model("User", userSchema);
