import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController";
import protectedRoute from "../middleware/protectedRoute";

const router = express.Router();
router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);
module.exports = router;
