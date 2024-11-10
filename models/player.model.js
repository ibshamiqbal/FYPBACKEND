const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
  espnID: { type: String },
  espnName: { type: String },
  nbaComName: { type: String },
  college: { type: String },
  weight: { type: String },
  nbaComHeadshot: { type: String },
  jerseyNum: { type: String },
  team: { type: String },
  espnLink: { type: String },
  bDay: { type: String },
  espnHeadshot: { type: String },
  nbaComID: { type: String },
  shortName: { type: String },
  nbaComLink: { type: String },
  teamID: { type: String },
  bRefName: { type: String },
  pos: { type: String },
  cbsPlayerID: { type: String },
  longName: { type: String },
  height: { type: String },
  bRefID: { type: String },
  lastGamePlayed: { type: String },
  playerID: { type: String },
  exp: { type: String },
  stats: {
    blk: { type: String },
    fga: { type: String },
    DefReb: { type: String },
    ast: { type: String },
    ftp: { type: String },
    tptfgp: { type: String },
    tptfgm: { type: String },
    trueShootingPercentage: { type: String },
    stl: { type: String },
    fgm: { type: String },
    pts: { type: String },
    reb: { type: String },
    fgp: { type: String },
    effectiveShootingPercentage: { type: String },
    fta: { type: String },
    mins: { type: String },
    gamesPlayed: { type: String },
    TOV: { type: String },
    tptfga: { type: String },
    OffReb: { type: String },
    ftm: { type: String }
  }
}, {
  timestamps: true // Enable timestamps
});

const PlayerStats = mongoose.model('PlayerStats', playerStatsSchema);

module.exports = PlayerStats;
