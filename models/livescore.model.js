const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Player Schema
const PlayerSchema = new Schema({
  playerID: { type: String },
  longName: { type: String },
  team: { type: String },
  teamAbv: { type: String },
  teamID: { type: String },
  gameID: { type: String },
  mins: { type: String },
  pts: { type: Number, required: true },
  reb: { type: Number, required: true },
  ast: { type: Number, required: true },
  fga: { type: Number, required: true },
  fgm: { type: Number, required: true },
  fgp: { type: String },
  tptfga: { type: Number, required: true },
  tptfgm: { type: Number, required: true },
  tptfgp: { type: String },
  fta: { type: Number, required: true },
  ftm: { type: Number, required: true },
  ftp: { type: String },
  OffReb: { type: Number, required: true },
  DefReb: { type: Number, required: true },
  blk: { type: Number, required: true },
  stl: { type: Number, required: true },
  TOV: { type: Number, required: true },
  PF: { type: Number, required: true },
  plusMinus: { type: Number },
  fantasyPoints: { type: Number },
});

// Team Stats Schema
const TeamStatsSchema = new Schema({
  teamID: { type: String },
  team: { type: String },
  teamAbv: { type: String },
  fga: { type: Number, required: true },
  fgm: { type: Number, required: true },
  fgp: { type: String },
  tptfga: { type: Number, required: true },
  tptfgm: { type: Number, required: true },
  tptfgp: { type: String },
  fta: { type: Number, required: true },
  ftm: { type: Number, required: true },
  ftp: { type: String },
  OffReb: { type: Number, required: true },
  DefReb: { type: Number, required: true },
  blk: { type: Number, required: true },
  stl: { type: Number, required: true },
  ast: { type: Number, required: true },
  PF: { type: Number, required: true },
  TOV: { type: Number, required: true },
  pts: { type: Number, required: true },
  fastBreakPts: { type: Number },
  pointsInPaint: { type: Number },
  ptsOffTOV: { type: Number },
  largestLead: { type: Number },
  flagrantFouls: { type: Number },
  tech: { type: Number },
});

// Line Score Schema
const LineScoreSchema = new Schema({
  teamID: { type: String },
  teamAbv: { type: String },
  totalPts: { type: Number, required: true },
  Q1: { type: Number, required: true },
  Q2: { type: Number, required: true },
  Q3: { type: Number, required: true },
  Q4: { type: Number, required: true },
});

// Main Game Schema
const GameSchema = new Schema({
  gameID: { type: String },
  gameDate: { type: String },
  gameLocation: { type: String },
  arena: { type: String },
  arenaCapacity: { type: Number },
  referees: { type: String },
  attendance: { type: Number },
  gameClock: { type: String },
  gameStatus: { type: String },
  gameStatusCode: { type: String },
  home: { type: String },
  away: { type: String },
  homePts: { type: Number },
  awayPts: { type: Number },
  homeResult: { type: String, enum: ['Win', 'Loss', 'Draw'], default: null },
  awayResult: { type: String, enum: ['Win', 'Loss', 'Draw'], default: null },
  teamIDHome: { type: String },
  teamIDAway: { type: String },
  players: [PlayerSchema],
  teamStats: [TeamStatsSchema],
  lineScore: [LineScoreSchema],
});

// Add indexes for commonly queried fields (optional)
GameSchema.index({ gameID: 1 });
GameSchema.index({ 'players.playerID': 1 });

const LiveScore = mongoose.model('LiveScore', GameSchema);

module.exports = LiveScore;
