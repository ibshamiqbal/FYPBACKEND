const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  link: { type: String, required: true },
  origin: { type: String, required: true },
  referer: { type: String, required: true },
  useragent: { type: String, required: true },
}, {
  timestamps: true  // Adds createdAt and updatedAt fields
});

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;
