import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import {getPaginationOptions} from "../utils/pagination.js";


// GET /api/v1/users
export const getAllUsers = async (req, res) => {
    try {
        const { skip, limit } = getPaginationOptions(req);
        const { search } = req.query;

        let query = {};
        if (search) {
            const regex = new RegExp(search, 'i'); // case-insensitive search
            query = {
                $or: [
                    { name: regex },
                    { username: regex }
                ]
            };
        }

        const users = await User.find(query).skip(skip).limit(limit).select('-passwordHash');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET /api/v1/users/:id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Invalid user ID', error });
    }
};



// PUT /api/v1/users/:id
export const updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const updateData = {
            ...(username && { username }),
            ...(email && { email }),
            updatedAt: new Date()
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.passwordHash = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select('-passwordHash');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update user', error });
    }
};

// DELETE /api/v1/users/:id
export const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete user', error });
    }
};