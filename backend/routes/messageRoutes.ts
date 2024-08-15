import express from "express";
import { sendMessage } from "../controllers/messageController";
import protectedRoute from "../middleware/protectedRoute";

const router = express.Router();
router.post("/send/:id", protectedRoute, sendMessage);
module.exports = router;
