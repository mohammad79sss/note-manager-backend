import Chatroom from '../models/chatroomModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';



//READ ALL
export const getAllChatrooms = async(req,res)=>{
    try{
        const chatrooms = await Chatroom.find();
        res.json(chatrooms);
    }
    catch (error){
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
    }
}

// CREATE
export const createChatroom = async (req, res) => {
    try {
        const { ownerId, title, content, isShared, allowedUsers, sharedId } = req.body;

        if (!isShared && (!allowedUsers || allowedUsers.length === 0)) {
            return res.status(400).json({ message: 'Private chatroom must include allowedUsers' });
        }

        const newChatroom = new Chatroom({
            ownerId,
            title,
            content,
            isShared,
            sharedId: isShared ? sharedId : undefined,
            allowedUsers: isShared ? [] : allowedUsers,
            lastModified: new Date()
        });

        const saved = await newChatroom.save();
        res.status(StatusCodes.CREATED).json(saved);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// READ
export const getChatroomById = async (req, res) => {
    try {
        const chatroom = await Chatroom.findById(req.params.id);
        if (!chatroom) return res.status(404).json({ message: 'Chatroom not found' });
        res.json(chatroom);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// UPDATE
export const updateChatroom = async (req, res) => {
    try {
        const updated = await Chatroom.findByIdAndUpdate(
            req.params.id,
            { ...req.body, lastModified: new Date() },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Chatroom not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE
export const deleteChatroom = async (req, res) => {
    try {
        const deleted = await Chatroom.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Chatroom not found' });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 1. GET chatrooms by ownerId
export const getChatroomsByOwner = async (req, res) => {
    try {
        const chatrooms = await Chatroom.find({ ownerId: req.params.userId });
        res.json(chatrooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. GET all public chatrooms
export const getAllPublicChatrooms = async (_req, res) => {
    try {
        const chatrooms = await Chatroom.find({ isShared: true });
        res.json(chatrooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. GET chatrooms where user has access (in allowedUsers)
export const getChatroomsUserHasAccessTo = async (req, res) => {
    try {
        const chatrooms = await Chatroom.find({
            isShared: false,
            allowedUsers: new mongoose.Types.ObjectId(req.params.userId)
        });
        res.json(chatrooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. ADD user to chatroom
export const addUserToChatroom = async (req, res) => {
    try {
        const { chatroomId, userId } = req.params;
        const updated = await Chatroom.findByIdAndUpdate(
            chatroomId,
            { $addToSet: { allowedUsers: userId }, lastModified: new Date() },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Chatroom not found' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
