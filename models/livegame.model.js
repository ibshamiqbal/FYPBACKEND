const mongoose = require('mongoose');

const liveGameSchema = new mongoose.Schema({
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    score: { type: String, required: true },
    channel: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    highlights: { type: String, required: true },
    restriction: { type: String, required: true },
    live: { type: Boolean , default : false },

});

module.exports = mongoose.model('LiveGame', liveGameSchema);
