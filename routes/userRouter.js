import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController.js';
import authenticationChecker from "../middlewares/authenticationCheckerMiddleware.js";


const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
