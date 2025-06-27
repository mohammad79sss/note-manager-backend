import mongoose from "mongoose";
import Comment from "../models/commentModel.js"
import { StatusCodes } from 'http-status-codes';
export const getAllComments = async(req,res)=>{
    try{
        const comments = await Comment.find();
        res.status(StatusCodes.OK).json(comments);
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({message:'failed to get comments', error:error.message});
    }
}

export const createComment = async(req,res)=>{
    try{
        const { noteId, senderId, content, system}= req.body;
        const newComment = new Comment({
            noteId,
            senderId,
            content,
            system: system || false,
            timeStamp: new Date()
        })
        const savedComment = await newComment.save();
        res.status(StatusCodes.OK).json(savedComment);
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({message:'failed to create comment', error:error.message})
    }
}

export const getCommentById = async(req,res)=>{
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId).populate('senderId','username email');
        res.status(StatusCodes.OK).json(comment);
    }catch (error){
        res.status(StatusCodes.BAD_REQUEST).json({message:'failed to retrieve comment', error:error.message});
    }
}

export const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { content, system } = req.body;

        const updateData = {
            ...(content && { content }),
            ...(system !== undefined && { system }),
            timestamp: new Date()
        };

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            updateData,
            { new: true }
        );

        if (!updatedComment) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found' });
        }

        // Return the updated comment
        res.status(StatusCodes.OK).json(updatedComment);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Failed to edit comment',
            error: error.message
        });
    }
};

export const deleteComment = async(req,res)=>{
    try{
        const commentId = req.params.id;
        const result = await Comment.findByIdAndDelete(commentId);
        if (!result) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found' });
        res.status(StatusCodes.NO_CONTENT).send();

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Failed to delete comment',
            error: error.message
        });
    }
}

export const getCommentsByNote = async (req,res)=>{
    try{
        const comments = await Comment.find({noteId:req.params.noteId})
            .sort({ timestamp: -1 }) //  newest to oldest
            .populate('senderId', 'username email');
        console.log(comments);
        res.status(StatusCodes.OK).json(comments);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Failed to retrieve comments',
            error: error.message
        });
    }
}