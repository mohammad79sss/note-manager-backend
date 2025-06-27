import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; // or bcrypt
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            passwordHash,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedUser = await newUser.save();
        res.status(201).json({ ...savedUser.toObject(), passwordHash: undefined });
    } catch (error) {
        res.status(400).json({ message: 'Failed to register user', error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};

export const logoutUser = async (req, res) => {
    // For token-based auth, logout is client-side (e.g., delete token).
    // You can implement token blacklist if needed.
    res.status(200).json({ message: 'Logged out (client-side should delete token)' });
};
