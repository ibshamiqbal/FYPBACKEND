const mongoose = require('mongoose');

const standingsSchema = new mongoose.Schema({
  position: { type: Number },
  stage: { type: String },
  
  group: {
    name: { type: String },
    points: { type: String, default: null }
  },
  team: {
    identifier: { type: Number },
    name: { type: String },
    logo: { type: String }
  },
  league: {
    identifier: { type: Number },
    name: { type: String },
    type: { type: String },
    season: { type: String },
    logo: { type: String }
  },
  country: {
    identifier: { type: Number },
    name: { type: String },
    code: { type: String },
    flag: { type: String }
  },
  games: {
    played: { type: Number },
    win: {
      total: { type: Number },
      percentage: { type: String }
    },
    lose: {
      total: { type: Number },
      percentage: { type: String }
    }
  },
  points: {
    for: { type: Number },
    against: { type: Number }
  },
  form: { type: String },
  description: { type: String }
}, {
  timestamps: true  // Add timestamps option here
});

const Standings = mongoose.model('Standings', standingsSchema);

module.exports = Standings;
