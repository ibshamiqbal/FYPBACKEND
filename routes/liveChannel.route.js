const express = require('express');
const liveChannelRoute = express.Router();
const { createLiveChannel, getLiveChannels, deleteLiveChannel} = require('../controllers/liveChannel.controller');

liveChannelRoute.post('/create-LiveChannel', createLiveChannel);
liveChannelRoute.get('/get-LiveChannels', getLiveChannels);
liveChannelRoute.delete('/liveChannel/delete-LiveChannel/:id', deleteLiveChannel);


module.exports = { liveChannelRoute };
