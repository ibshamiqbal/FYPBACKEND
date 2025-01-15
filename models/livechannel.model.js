const mongoose = require('mongoose');

const liveChannelSchema = new mongoose.Schema({
   name: { type: String, required: true },
  livestream: { type: String, required: true },
  origin: { type: String, required: true },
  referer: { type: String, required: true },
  useragent: { type: String, required: true }, // Ensure this field is defined

    
});

module.exports = mongoose.model('LiveChannel', liveChannelSchema);

