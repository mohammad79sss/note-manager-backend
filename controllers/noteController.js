// controllers/noteController.js
import Note from '../models/noteModel.js';
import { StatusCodes } from 'http-status-codes';

// GET /api/v1/notes
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ updatedAt: -1 });
        res.status(StatusCodes.OK).json(notes);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// GET /api/v1/notes/user/:ownerId
export const getNotesByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const notes = await Note.find({ ownerId }).sort({ updatedAt: -1 });
        res.status(StatusCodes.OK).json(notes);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// GET /api/v1/notes/:id
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Note not found' });
        res.status(StatusCodes.OK).json(note);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// POST /api/v1/notes
export const createNote = async (req, res) => {
    try {
        const newNote = new Note({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastModified: new Date(),
        });
        const savedNote = await newNote.save();
        res.status(StatusCodes.CREATED).json(savedNote);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// PUT /api/v1/notes/:id
export const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updatedAt: new Date(),
                lastModified: new Date(),
            },
            { new: true }
        );
        if (!updatedNote) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Note not found' });
        res.status(StatusCodes.OK).json(updatedNote);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// DELETE /api/v1/notes/:id
export const deleteNote = async (req, res) => {
    try {
        const deleted = await Note.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Note not found' });
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};
