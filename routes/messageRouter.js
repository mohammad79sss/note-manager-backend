import express from 'express';
import {
    createMessage,
    getMessageById,
    updateMessage,
    deleteMessage,
    getMessagesByChatroom,
    getAllMessages
} from '../controllers/messageController.js';
import authenticationChecker from "../middlewares/authenticationCheckerMiddleware.js";


const router = express.Router();

router.get('/',getAllMessages);
router.post('/', createMessage);
router.get('/:id', getMessageById);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);
router.get('/chatroom/:chatroomId', getMessagesByChatroom);

export default router;
