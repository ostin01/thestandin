"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
exports.getMessages = getMessages;
const conversation_1 = require("../models/conversation");
const messageModel_1 = require("../models/messageModel");
function sendMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { message } = req.body;
            const receiverId = req.params.id;
            const senderId = req.user;
            let conversation = yield conversation_1.Conversation.findOne({
                participants: { $all: [receiverId, senderId] },
            });
            if (!conversation) {
                conversation = yield conversation_1.Conversation.create({
                    participants: [receiverId, senderId],
                });
            }
            const newMessage = new messageModel_1.Message({
                senderId,
                receiverId,
                message,
            });
            if (newMessage) {
                conversation.message.push(newMessage._id);
            }
            // this will run at the same time
            yield Promise.all([conversation.save(), newMessage.save()]);
            res.status(201).json(newMessage);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: receiverId } = req.params;
            const senderId = req.user;
            const conversation = yield conversation_1.Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            }).populate("message");
            if (!conversation) {
                return res.status(200).json([]);
            }
            res.status(200).json(conversation.message);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
