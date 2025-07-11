import express from "express";
import { loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import authenticationChecker from "../middlewares/authenticationCheckerMiddleware.js";


const router = express.Router();


router.post('/login', loginUser);
router.post('/logout',authenticationChecker, logoutUser); // optional for stateless JWT auth
router.post('/register', registerUser);

export default router;