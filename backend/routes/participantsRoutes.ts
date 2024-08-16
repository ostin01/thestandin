import express from "express";
import getChatParticipants from "../controllers/participants";
import protectedRoute from "../middleware/protectedRoute";

const router = express.Router();

router.get("/", protectedRoute, getChatParticipants);

module.exports = router;
