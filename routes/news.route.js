const express = require('express');
const { getNewsFromAPI, getNews, saveNews, postNews, fetchNews } = require("../controllers/news.controller.js");

const newsRoute = express.Router();

// Define routes for news operations
newsRoute.get("/getNews", getNews);             // Route to get news from the API
newsRoute.get("/fetchData", fetchNews);          // Route to fetch saved news from the database
newsRoute.post("/postNews", postNews);           // Route to post news data to the database


module.exports = { newsRoute };
