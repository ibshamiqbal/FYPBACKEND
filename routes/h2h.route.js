const express = require('express');
const { getH2hFromAPI ,  getH2h , getLastUpdatedH2h, savedH2h , postData , fetchData} = require("../controllers/h2h.controller.js")

const h2hRoute = express.Router()


h2hRoute.get("/getH2h" , getH2h)
h2hRoute.get("/fetchData",fetchData)
h2hRoute.post("/posth2h" , postData)
h2hRoute.get('/h2h/last-updated', getLastUpdatedH2h);



module.exports = { h2hRoute}