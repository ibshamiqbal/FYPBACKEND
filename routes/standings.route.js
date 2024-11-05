const express = require('express');
const {getStandings, getStandingsFromAPI, getLastUpdatedStandings, saveStandings , postData ,fetchData} = require("../controllers/standings.controller.js")

const standingsRoute = express.Router()

standingsRoute.get("/getStandings",getStandings)
standingsRoute.get("/getStandingsFromAPI",getStandingsFromAPI)
standingsRoute.get("/saveStandings",saveStandings)
standingsRoute.post("/postData",postData)
standingsRoute.get("/fetchData",fetchData)
// Route to get the last updated time of standings
standingsRoute.get('/standings/last-updated', getLastUpdatedStandings);

module.exports = { standingsRoute}