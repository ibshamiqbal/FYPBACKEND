const express = require('express');
const { getPlayerStats, postPlayerStats, fetchPlayerStats } = require('../controllers/player.controller');

const playerRoute = express.Router();

// Route to get player stats by playerId
playerRoute.get('/getPlayerStats/:playerId', getPlayerStats);

// Route to post new player stats (fetch from API and save to DB)
playerRoute.post('/postPlayerStats', postPlayerStats);

// Route to fetch all saved player stats from DB
playerRoute.get('/fetchPlayerStats', fetchPlayerStats);



module.exports = { playerRoute };
