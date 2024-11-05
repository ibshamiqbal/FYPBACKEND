const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from the response
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error in getAllUsers ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get user details by ID
const getUser = async (req, res) => {
    const { id } = req.params; // User ID from request params
    try {
        const user = await User.findById(id).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in getUser ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update user details
const updateUser = async (req, res) => {
    const { id } = req.params; // User ID from request params
    const { name, email, password } = req.body; // New user data from the request body

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (email) {
            const userExists = await User.findOne({ email });
            if (userExists && userExists._id.toString() !== id) {
                return res.status(400).json({ success: false, message: 'Email is already in use' });
            }
            user.email = email;
        }

        if (name) user.name = name;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in updateUser ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params; // User ID from request params

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.log("Error in deleteUser ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
