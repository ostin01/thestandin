import express from "express";
import protectedRoute from "../middleware/protectedRoute";
import {
  getChatParticipants,
  getConversation,
} from "../controllers/participants";

const router = express.Router();

router.get("/", protectedRoute, getChatParticipants);
router.get("/get-conversation", protectedRoute, getConversation);

module.exports = router;
