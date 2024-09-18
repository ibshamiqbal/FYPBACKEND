const express = require('express');
const streamRoute = express.Router();
const { postStream, fetchStream } = require('../controllers/stream.controller.js');  // Import the controller functions

// Define the POST route for saving a stream
streamRoute.post("/poststream", postStream);

// Define the GET route for fetching streams
streamRoute.get("/fetchstream", fetchStream);

module.exports = {streamRoute};  // Export the router
