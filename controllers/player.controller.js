require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // This allows Express to parse JSON requests


const PlayerStats = require('../models/player.model.js'); // Assuming your PlayerStats model is in this file

// Function to get Player Stats from API
const getPlayerStatsFromAPI = async (playerId) => {
    const rapidapiurl = `https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo?playerName=smith&statsToGet=averages`;
    const headers = {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': process.env.API_HOST
    };

    try {
        const response = await axios.get(rapidapiurl, { headers });
        if (!response.data) throw new Error('Empty API response');
        return response.data;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
};


// GET API: Fetch Player Stats by ID
const getPlayerStats = async (req, res) => {
    const { playerId } = req.params;
    // if (!playerId) {
    //     return res.status(400).send('Player ID is required');
    // }

    try {
        const apiResponse = await getPlayerStatsFromAPI(playerId);
        console.log("Full API Response", apiResponse); // Check entire response
        const playerStats = apiResponse.body || apiResponse.response; // Adjust based on structure
        if (!playerStats) return res.status(404).send("No player stats found");
        res.json(playerStats);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching player stats');
    }
};

// Function to save Player Stats to the database
const savePlayerStats = async (stats) => {
    try {
        const savedStats = await PlayerStats.insertMany(stats);
        return savedStats;
    } catch (error) {
        console.error('Error saving player stats:', error);
        throw error;
    }
};

// POST API: Fetch and Save Player Stats
const postPlayerStats = async (req, res) => {
    const { playerId } = req.body;

    if (!playerId) {
        return res.status(400).send('Player ID is required');
    }

    try {
        const apiResponse = await getPlayerStatsFromAPI(playerId);
        if (!apiResponse) return res.status(500).send('No response from API');

        const playerStats = apiResponse.data || apiResponse.response || apiResponse.body;

        if (!playerStats) {
            return res.status(500).send('No player stats found in the API response');
        }

        const savedStats = await savePlayerStats(playerStats);
        res.status(201).json(savedStats);
    } catch (error) {
        console.error('Error in postPlayerStats:', error);
        res.status(500).send('An error occurred while fetching and saving player stats');
    }
};

// GET API: Fetch all saved Player Stats from the database
const fetchPlayerStats = async (req, res) => {
    try {
        const playerStats = await PlayerStats.find({}); // Retrieve all player stats
        console.log(playerStats);
        res.status(200).json(playerStats); // Return the stats
    } catch (error) {
        console.error('Error fetching player stats:', error);
        res.status(500).send('An error occurred while fetching player stats');
    }
};

module.exports = {
    getPlayerStats,
    postPlayerStats,
    fetchPlayerStats
};
