require('dotenv').config();
const NewsModel = require('../models/news.model.js'); // Assuming `NewsModel` is your MongoDB model for News
const axios = require('axios');

const getNewsFromAPI = async () => {
    const rapidapiurl = 'https://wnba-api.p.rapidapi.com/wnba-news '; // Make sure this is correct
    const headers = {
        'x-rapidapi-key': process.env.NEWS_KEY,
        'x-rapidapi-host': process.env.NEWS_HOST
    };

    try {
        const response = await axios.get(rapidapiurl, { headers });
        console.log("Full API Response", response.data); // Log the response to check structure
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error.message);
        throw error;
    }
};

// GET API: Fetch News
const getNews = async (req, res) => {
    try {
        const apiResponse = await getNewsFromAPI();
        console.log("Full API Response", apiResponse); // Check entire response

        // Assuming the API returns an array of news articles
        const newsData = apiResponse; 
        if (!newsData || newsData.length === 0) {
            return res.status(404).send("No news found");
        }

        res.json(newsData);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching news');
    }
};


// Function to save news articles to the database
const saveNews = async (newsArticles) => {
    try {
        const savedArticles = await NewsModel.insertMany(newsArticles);
        return savedArticles;
    } catch (error) {
        console.error('Error saving news articles:', error);
        throw error;
    }
};

// POST API: Fetch and Save News
const postNews = async (req, res) => {
    try {
        const apiResponse = await getNewsFromAPI();
        const newsArticles = apiResponse;
        const savedArticles = await saveNews(newsArticles);

        res.status(201).json(savedArticles);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and saving news');
    }
};

// GET API: Fetch all saved News articles from the database
const fetchNews = async (req, res) => {
    try {
        const newsArticles = await NewsModel.find({});
        console.log(newsArticles);
        res.status(200).json(newsArticles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('An error occurred while fetching news');
    }
};

module.exports = { getNewsFromAPI, getNews, saveNews, postNews, fetchNews };
