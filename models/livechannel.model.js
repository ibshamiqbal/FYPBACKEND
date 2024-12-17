const mongoose = require('mongoose');

const liveChannelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    livestream: { type: String, required: true }
});

module.exports = mongoose.model('LiveChannel', liveChannelSchema);
