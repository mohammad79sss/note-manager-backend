import Message from '../models/messageModel.js';
import { StatusCodes } from 'http-status-codes';
import {getPaginationOptions} from "../utils/pagination.js";


//GET /api/v1/messages
export const getAllMessages = async (req, res)=>{
    try{
        const { skip, limit } = getPaginationOptions(req);
        const messages = await Message.find().skip(skip).limit(limit);
        res.json(messages)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to send message', error: error.message });
    }
}

// POST /api/v1/messages
export const createMessage = async (req, res) => {
    try {
        const { chatroomId, senderId, content, system } = req.body;

        const newMessage = new Message({
            chatroomId,
            senderId,
            content,
            system: system || false,
            timestamp: new Date()
        });

        const savedMessage = await newMessage.save();
        res.status(StatusCodes.CREATED).json(savedMessage);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to send message', error: error.message });
    }
};

// GET /api/v1/messages/:id
export const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id).populate('senderId', 'username email');
        if (!message) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Message not found' });
        res.status(StatusCodes.OK).json(message);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Error retrieving message', error: error.message });
    }
};

// PUT /api/v1/messages/:id
export const updateMessage = async (req, res) => {
    try {

        const { content, system } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            {
                ...(content && { content }),
                ...(system !== undefined && { system }),
                timestamp: new Date()
            },
            { new: true }
        );
        if (!updatedMessage) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Message not found' });
        res.status(StatusCodes.OK).json(updatedMessage);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Update failed', error: error.message });
    }
};

// DELETE /api/v1/messages/:id
export const deleteMessage = async (req, res) => {
    try {
        const result = await Message.findByIdAndDelete(req.params.id);
        if (!result) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Message not found' });
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Deletion failed', error: error.message });
    }
};

// GET /api/v1/messages/chatroom/:chatroomId
export const getMessagesByChatroom = async (req, res) => {
    try {
        const { skip, limit } = getPaginationOptions(req);
        const messages = await Message.find({ chatroomId: req.params.chatroomId })
            .skip(skip)
            .limit(limit)
            .sort({ timestamp: 1 }) //  newest to oldest
            .populate('senderId', 'username email');
        res.status(StatusCodes.OK).json(messages);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to fetch messages', error: error.message });
    }
};
