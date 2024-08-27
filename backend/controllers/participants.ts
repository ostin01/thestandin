import { Request, Response } from "express";
import { User } from "../models/userModels";
import { Conversation } from "../models/conversation";

export async function getChatParticipants(req: Request, res: Response) {
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

export async function getConversation(req: Request, res: Response) {
  try {
    const loggedinUserId = (req as any).user;

    // Find conversations involving the logged-in user
    const conversations = await Conversation.find({
      participants: loggedinUserId,
    });

    // Extract participant IDs from conversations
    const participantIds = conversations
      .flatMap((conv) => conv.participants)
      .filter((id) => id.toString() !== loggedinUserId);

    // Remove duplicate IDs
    const uniqueParticipantIds = [...new Set(participantIds)];

    // Fetch the user details for these participant IDs
    const filteredUsers = await User.find({
      _id: { $in: uniqueParticipantIds },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
