const express = require('express');
const liveGameRoute = express.Router();
const { createLiveGames, getLiveGames , deleteLiveGame , flipLiveGame } = require('../controllers/livegame.controller'); 


liveGameRoute.post("/create-LiveGames", createLiveGames);
liveGameRoute.get("/get-LiveGames", getLiveGames);
liveGameRoute.delete('/liveGame/delete-LiveGame/:id', deleteLiveGame);
liveGameRoute.put('/liveGame/flip-LiveGame/:id', flipLiveGame);



module.exports = {liveGameRoute}; 
