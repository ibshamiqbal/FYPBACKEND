const express = require('express');
const { getGamesFromAPI,  getGames , postData , saveGames , fetchData} = require("../controllers/games.controller.js")

const gamesRoute = express.Router()

gamesRoute.get("/getGamesFromAPI" , getGamesFromAPI)
gamesRoute.get("/getGames" , getGames)
gamesRoute.get("/saveGames",saveGames)
gamesRoute.get("/fetchData",fetchData)
gamesRoute.post("/postgames" , postData)



module.exports = { gamesRoute}