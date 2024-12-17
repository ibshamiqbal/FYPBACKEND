const express = require('express');
const teamRoute = express.Router();
const { createTeam , getTeam , deleteTeam} = require('../controllers/team.controller'); 


teamRoute.post("/create-team", createTeam);
teamRoute.get("/get-team", getTeam);
teamRoute.delete('/team/delete-team/:id', deleteTeam);


module.exports = {teamRoute}; 
