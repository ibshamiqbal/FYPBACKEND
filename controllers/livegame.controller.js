require('dotenv').config();
const liveGame = require('../models/livegame.model');

const createLiveGames = async (req, res) => {
    const { team1, team2, score, channel, date, time, highlights, restriction } = req.body;

    // Validate the request body
    if (!team1 || !team2 || !score || !channel || !date || !time || !highlights || !restriction) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Create a new live game instance
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

        // Save the live game to the database
        const savedLiveGame = await newLiveGame.save();

        // Respond with the saved live game
        return res.status(201).json(savedLiveGame);
    } catch (error) {
        console.error('Error saving live game:', error);

        // Handle server errors
        return res.status(500).send('An error occurred while saving the live game');
    }
};

// Controller to fetch all live games
const getLiveGames = async (req, res) => {
    try {
        // Fetch all live games from the database
        const liveGames = await liveGame.find({});
        
        // Respond with the live games
        return res.json(liveGames);
    } catch (error) {
        console.error('Error fetching live games:', error);

        // Handle server errors
        return res.status(500).send('An error occurred while fetching live games');
    }
};

const deleteLiveGame = async (req, res) => {
    try {
        console.log(`Request to delete game with ID: ${req.params.id}`); // Log the ID

        const deletedGame = await liveGame.findByIdAndDelete(req.params.id);

        if (!deletedGame) {
            console.error('Game not found');
            return res.status(404).send({ message: 'Game not found' });
        }

        console.log('Game deleted successfully:', deletedGame);
        res.status(200).send({ message: 'Game deleted successfully', deletedGame });
    } catch (error) {
        console.error('Error deleting game:', error.message);
        res.status(500).send({ message: 'An error occurred while deleting the game' });
    }
};

const flipLiveGame = async (req, res) => {
    try {
      const { id } = req.params;
      const flipGame = await liveGame.findById(id);
  
      if (!flipGame) {
        return res.status(404).send({ message: "Game not found" });
      }
      // Flip the channel
      flipGame.live = !flipGame.live;
      await flipGame.save();
  
      res.status(200).send({ message: "Channel flipped successfully", flipGame });
    } catch (error) {
      console.error("Error flipping live channel:", error.message);
      res.status(500).send({ message: "An error occurred while flipping the channel" });
    }
  };
  
  

// Export the controllers
module.exports = { createLiveGames, getLiveGames , deleteLiveGame , flipLiveGame };
