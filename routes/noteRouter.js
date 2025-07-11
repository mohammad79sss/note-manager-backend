// routes/noteRouter.js
import express from 'express';
import {
    getAllNotes,
    getNotesByOwner,
    getNoteById,
    createNote,
    updateNote,
    deleteNote, getAllPublicNotes
} from '../controllers/noteController.js';
import authenticationChecker from "../middlewares/authenticationCheckerMiddleware.js";

const router = express.Router();
router.use(authenticationChecker);

router.get('/', getAllNotes);
router.get('/public/all', getAllPublicNotes);
router.get('/user/:ownerId', getNotesByOwner); // ✅ specific route for user notes
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
