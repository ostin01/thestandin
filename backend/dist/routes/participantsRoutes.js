"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const participants_1 = __importDefault(require("../controllers/participants"));
const protectedRoute_1 = __importDefault(require("../middleware/protectedRoute"));
const router = express_1.default.Router();
router.get("/", protectedRoute_1.default, participants_1.default);
module.exports = router;
