import express from "express";
import {
  signup,
  login,
  logoutUser,
  getLoggedinUser,
  updateUserProfile,
} from "../controllers/userControllers";
import protectedRoute from "../middleware/protectedRoute";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logoutUser);
router.put("/update-profile/:id", updateUserProfile);
router.get("/getme", protectedRoute, getLoggedinUser);
module.exports = router;
