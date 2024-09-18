const express = require('express');
const {getStandings, getStandingsFromAPI, saveStandings , postData ,fetchData} = require("../controllers/standings.controller.js")

const standingsRoute = express.Router()

standingsRoute.get("/getStandings",getStandings)
standingsRoute.get("/getStandingsFromAPI",getStandingsFromAPI)
standingsRoute.get("/saveStandings",saveStandings)
standingsRoute.post("/postData",postData)
standingsRoute.get("/fetchData",fetchData)


module.exports = { standingsRoute}