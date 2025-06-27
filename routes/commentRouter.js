import express from 'express';
import {
    getAllComments,
    createComment,
    getCommentsByNote,
    getCommentById,
    updateComment,
    deleteComment
} from '../controllers/commentController.js';

const router = express.Router();

router.get('/', getAllComments);
router.post('/', createComment);
router.get('/note/:noteId',getCommentsByNote);
router.get('/:id',getCommentById);
router.put('/:id',updateComment);
router.delete('/:id',deleteComment);


export default router;