import express from "express";
import { signup, login, logoutUser } from "../controllers/userControllers";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logoutUser);
module.exports = router;
