const mongoose = require('mongoose');

const h2hSchema = new mongoose.Schema({
  id: { type: Number },
  date: { type: Date },
  time: { type: String },
  timestamp: { type: Number },
  timezone: { type: String },
  stage: { type: String, default: null },
  week: { type: String, default: null },
  venue: { type: String, default: null },
  status: {
    long: { type: String },
    short: { type: String },
    timer: { type: String, default: null }
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
  teams: {
    home: {
      identifier: { type: String },
      name: { type: String },
      logo: { type: String }
    },
    away: {
      identifier: { type: String },
      name: { type: String },
      logo: { type: String }
    }
  },
  scores: {
    home: {
      quarter_1: { type: Number },
      quarter_2: { type: Number },
      quarter_3: { type: Number },
      quarter_4: { type: Number },
      overtime: { type: String, default: null },
      total: { type: Number }
    },
    away: {
      quarter_1: { type: Number },
      quarter_2: { type: Number },
      quarter_3: { type: Number },
      quarter_4: { type: Number },
      overtime: { type: String, default: null },
      total: { type: Number }
    }
  }
}, {
  timestamps: true // Enable timestamps
});

const H2h = mongoose.model('H2h', h2hSchema);

module.exports = H2h;
