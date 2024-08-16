import { Request, Response } from "express";
import { User } from "../models/userModels";

export default async function getChatParticipants(req: Request, res: Response) {
  try {
    const loggedinUserId = (req as any).user;

    const filteredUsers = await User.find({
      _id: { $ne: loggedinUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
