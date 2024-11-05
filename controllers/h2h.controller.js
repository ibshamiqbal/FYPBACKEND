require('dotenv').config();
const axios = require('axios');
const h2hModel = require('../models/h2h.model.js');

const getH2hFromAPI = async (h2h) => {
    const rapidapiurl = `https://api-basketball.p.rapidapi.com/games?h2h=${h2h}`;
    const headers = {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST
    };

    try {
        const response = await axios.get(rapidapiurl, { headers });
        console.log(JSON.stringify(response.data));
        return response.data
    } catch (error) {
        console.error('Error fetching head to head:', error);
        throw error;
    }
};



const getH2h = async (req, res) => {
    
    const h2h = "142-144";

    if (!h2h) {
        return res.status(400).send('H2h is required');
    }

    try {
        const apiResponse = await getH2hFromAPI(h2h);
        const h2h1 = apiResponse.response;
        console.log("Api Response",apiResponse);
        res.json(h2h1);
       
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and saving the games');
    }
};

const savedH2h = async (h2h) => {
    try {
        const saveH2h = await h2hModel.insertMany(h2h);
        return saveH2h;
    } catch (error) {
        console.error('Error saving head to head:', error);
        throw error;
    }
};

const  postData = async (req, res) => {
    const {h2h} = req.body;

    if (!h2h) {
        return res.status(400).send('H2h is required');
    }

    try {
        const apiResponse = await getH2hFromAPI(h2h);
        const h2h1 = apiResponse.response;
        const saveH2h = await savedH2h(h2h1);

        res.status(201).json(saveH2h);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and saving the games');
    }
};

const fetchData = async (req, res) => {
    try {

        const h2h = await h2hModel.find({});
        
        console.log(h2h);
        
        res.status(200).json(h2h);
    } catch (error) {
        
        console.error('Error fetching h2h:', error);
        res.status(500).send('An error occurred while fetching the h2h');
    }
};

const getLastUpdatedH2h = async (req, res) => {
    try {
        const latestH2h = await h2hModel.findOne().sort({ updatedAt: -1 });
        res.json({ lastUpdated: latestH2h ? latestH2h.updatedAt : null });
    } catch (error) {
        res.status(500).send('Error fetching last update time for h2h');
    }
};


module.exports = {  getH2h ,  postData , fetchData, getLastUpdatedH2h};