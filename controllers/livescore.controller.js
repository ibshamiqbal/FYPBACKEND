require('dotenv').config();
const LiveScore = require('../models/livescore.model'); 
const axios = require('axios');


const getLiveScoresFromAPI = async () => {
    const rapidapiurl = 'https://tank01-fantasy-stats.p.rapidapi.com/getNBABoxScore?gameID=20240107_SA%40CLE&fantasyPoints=true&pts=1&stl=3&blk=3&reb=1.25&ast=1.5&TOV=-1&mins=0&doubleDouble=0&tripleDouble=0&quadDouble=0'; 
    const headers = {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY, // You need to set this in your environment variables
        'x-rapidapi-host': 'tank01-fantasy-stats.p.rapidapi.com' // Set the host correctly
    };

    try {
        const response = await axios.get(rapidapiurl, { headers, timeout: 5000 }); // Timeout set to 5 seconds
        console.log(JSON.stringify(response.data));
        return response.data; // Ensure you return the API response correctly
    } catch (error) {
        console.error('Error fetching live scores:', error);
        throw error;
    }
};

// GET API: Fetch live scores from API and return them
const getLiveScores = async (req, res) => {
    try {
        const apiResponse = await getLiveScoresFromAPI();
        console.log("Full API Response", apiResponse);

        if (!apiResponse || apiResponse.length === 0) {
            return res.status(404).send("No live scores found");
        }

        res.json(apiResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching live scores');
    }
};


// Function to save live scores to the database
const saveLiveScores = async (liveScores) => {
    try {
        const savedScores = await LiveScore.insertMany(liveScores);
        return savedScores;
    } catch (error) {
        console.error('Error saving live scores:', error);
        throw error;
    }
};

// POST API: Fetch and Save live scores
const postLiveScores = async (req, res) => {
    try {
        const apiResponse = await getLiveScoresFromAPI();
        const liveScores = apiResponse;
        const savedScores = await saveLiveScores(liveScores);

        res.status(201).json(savedScores);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and saving live scores');
    }
};

// GET API: Fetch all saved live scores from the database
const fetchSavedScores = async (req, res) => {
    try {
        const savedScores = await LiveScore.find({});
        console.log(savedScores);
        res.status(200).json(savedScores);
    } catch (error) {
        console.error('Error fetching saved scores:', error);
        res.status(500).send('An error occurred while fetching saved scores');
    }
};

module.exports = { getLiveScoresFromAPI, getLiveScores, saveLiveScores, postLiveScores, fetchSavedScores };
