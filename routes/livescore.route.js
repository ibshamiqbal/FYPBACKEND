const express = require('express');
const { getLiveScoresFromAPI, getLiveScores, saveLiveScores, postLiveScores, fetchSavedScores } = require("../controllers/livescore.controller");

const liveScoreRoute = express.Router();

liveScoreRoute.get("/getLiveScores", getLiveScores);          
liveScoreRoute.get("/fetchSavedScores", fetchSavedScores);    
liveScoreRoute.post("/postLiveScores", postLiveScores);      

module.exports = { liveScoreRoute };
