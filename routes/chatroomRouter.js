import express from 'express';
import {
    createChatroom,
    getChatroomById,
    updateChatroom,
    deleteChatroom,
    getChatroomsByOwner,
    getAllPublicChatrooms,
    getChatroomsUserHasAccessTo,
    addUserToChatroom,
    getAllChatrooms, getChatroomByShareId
} from '../controllers/chatroomController.js';

const router = express.Router();

router.get('/', getAllChatrooms);
router.post('/', createChatroom);
router.get('/:id', getChatroomById);
router.get('/by-share-id/:id/:sharedId',getChatroomByShareId);
router.put('/:id', updateChatroom);
router.delete('/:id', deleteChatroom);

router.get('/by-user/:userId', getChatroomsByOwner);
router.get('/public/all', getAllPublicChatrooms);
router.get('/access/:userId', getChatroomsUserHasAccessTo);
router.post('/:chatroomId/add-user/:userId', addUserToChatroom);

export default router;
