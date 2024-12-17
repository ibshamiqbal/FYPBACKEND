require('dotenv').config();  
const axios = require('axios');
const Team = require('../models/team.model'); 

const createTeam = async (req, res) => {
    const { name } = req.body;

    
    if (!name) {
        return res.status(400).send('name parameter is required');
    }

    try {
        
        const team = new Team({
            name
        });

        
        const savedTeam = await team.save();
        
        
        return res.status(201).json(savedTeam);
    } catch (error) {
        console.error('Error saving stream:', error);
        
        
        return res.status(500).send('An error occurred while saving the stream');
    }
};

const getTeam = async (req, res) => {
    const teams = await Team.find({})
    return res.json(teams)

}


const deleteTeam = async (req, res) => {
    try {
        const teamId = req.params.id; // Extract the team ID from params
        console.log(`Request to delete team with ID: ${teamId}`); // Log the ID

        // Ensure the correct model for teams is used (e.g., LiveTeam)
        const deletedTeam = await Team.findByIdAndDelete(teamId);

        if (!deletedTeam) {
            console.error('Team not found');
            return res.status(404).send({ message: 'Team not found' });
        }

        console.log('Team deleted successfully:', deletedTeam);
        res.status(200).send({ message: 'Team deleted successfully', deletedTeam });
    } catch (error) {
        console.error('Error deleting team:', error.message);
        res.status(500).send({ message: 'An error occurred while deleting the team' });
    }
};





module.exports = { createTeam , getTeam , deleteTeam };  