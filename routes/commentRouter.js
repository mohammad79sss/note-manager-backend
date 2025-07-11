import express from 'express';
import {
    getAllComments,
    createComment,
    getCommentsByNote,
    getCommentById,
    updateComment,
    deleteComment
} from '../controllers/commentController.js';
import authenticationChecker from "../middlewares/authenticationCheckerMiddleware.js";


const router = express.Router();
router.use(authenticationChecker);

router.get('/', getAllComments);
router.post('/', createComment);
router.get('/note/:noteId',getCommentsByNote);
router.get('/:id',authenticationChecker,getCommentById);
router.put('/:id',updateComment);
router.delete('/:id',deleteComment);


export default router;