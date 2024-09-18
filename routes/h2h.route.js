const express = require('express');
const { getH2hFromAPI ,  getH2h , savedH2h , postData , fetchData} = require("../controllers/h2h.controller.js")

const h2hRoute = express.Router()


h2hRoute.get("/getH2h" , getH2h)
h2hRoute.get("/fetchData",fetchData)
h2hRoute.post("/posth2h" , postData)



module.exports = { h2hRoute}