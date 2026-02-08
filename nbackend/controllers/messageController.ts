import { Request, Response } from "express";
import { Conversation } from "../models/conversation";
import { Message } from "../models/messageModel";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = (req as any).user;

    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receiverId, senderId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    // this will run at the same time
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function getMessages(req: Request, res: Response) {
  try {
    const { id: receiverId } = req.params;

    const senderId = (req as any).user;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("message");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.message);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
