const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const userRoute = express.Router();

userRoute.get('/users', getAllUsers); // Get all users
userRoute.get('/users/:id', getUser); // Get user by ID
userRoute.put('/users/:id', updateUser); // Update user by ID
userRoute.delete('/users/:id', deleteUser); // Delete user by ID

module.exports = { userRoute }

