require('dotenv').config();  
const axios = require('axios');
const Stream = require('../models/stream.model.js'); 
const postStream = async (req, res) => {
    const { link, origin, referer, useragent } = req.body;

    
    if (!link || !origin || !referer || !useragent) {
        return res.status(400).send('link, origin, referer, and useragent parameters are required');
    }

    try {
        
        const stream = new Stream({
            link,
            origin,
            referer,
            useragent
        });

        
        const savedStream = await stream.save();
        
        
        return res.status(201).json(savedStream);
    } catch (error) {
        console.error('Error saving stream:', error);
        
        
        return res.status(500).send('An error occurred while saving the stream');
    }
};


const 
fetchStream = async (req, res) => {
    try {
        const streams = await Stream.find({});  
        
        res.status(200).json(streams); 
    } catch (error) {
        console.error('Error fetching streams:', error);
        
       
        res.status(500).send('An error occurred while fetching the streams');
    }
};

module.exports = { postStream, fetchStream };  