require('dotenv').config();
const liveGame = require('../models/livegame.model');

// Create a new live game
const createLiveGames = async (req, res) => {
    const { team1, team2, score, channel, date, time, highlights, restriction } = req.body;

    // Validate required fields
    if (!team1 || !team2 || !score || !channel || !date || !time) {
        return res.status(400).send({ message: 'Some required fields are missing' });
    }

    try {
        // Save the new live game
        const newLiveGame = new liveGame({
            team1,
            team2,
            score,
            channel,
            date,
            time,
            highlights,
            restriction,
        });

        const savedLiveGame = await newLiveGame.save();
        res.status(201).json(savedLiveGame);
    } catch (error) {
        console.error('Error saving live game:', error.message);
        res.status(500).send({ message: 'An error occurred while saving the live game' });
    }
};
// Fetch all live games
const getLiveGames = async (req, res) => {
    try {
        // Add limit and timeout to prevent infinite query execution
        const liveGames = await liveGame.find({}).limit(100).maxTimeMS(5000);
        res.status(200).json(liveGames);
    } catch (error) {
        console.error('Error fetching live games:', error.message);
        res.status(500).send({ message: 'An error occurred while fetching live games' });
    }
};

// Delete a live game by ID
const deleteLiveGame = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGame = await liveGame.findByIdAndDelete(id);

        if (!deletedGame) {
            return res.status(404).send({ message: 'Game not found' });
        }

        res.status(200).send({ message: 'Game deleted successfully', deletedGame });
    } catch (error) {
        console.error('Error deleting game:', error.message);
        res.status(500).send({ message: 'An error occurred while deleting the game' });
    }
};

const flipLiveGame = async (req, res) => {
    const { id } = req.params;

    try {
        const flipGame = await liveGame.findById(id);

        if (!flipGame) {
            return res.status(404).send({ message: "Game not found" });
        }

        flipGame.live = !flipGame.live; // Toggle the live status
        const updatedGame = await flipGame.save();

        res.status(200).send({
            message: "Game live status flipped successfully",
            flipGame: updatedGame,
        });
    } catch (error) {
        console.error("Error flipping live status:", error.message);
        res.status(500).send({ message: "Error flipping live status" });
    }
};

module.exports = { createLiveGames, getLiveGames, deleteLiveGame, flipLiveGame };
