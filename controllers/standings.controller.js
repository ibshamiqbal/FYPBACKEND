require('dotenv').config();
const axios = require('axios');

const standingsModel = require('../models/standings.model');

const getStandingsFromAPI = async (league, season) => {
    const rapidapiurl = `https://api-basketball.p.rapidapi.com/standings?league=${league}&season=${season}`;
    const headers = {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST
    };

    try {
        const response = await axios.get(rapidapiurl, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw error;
    }
};

const getStandings = async (req, res) => {
    const league = 12;
    const season = "2019-2020";

    if (!league || !season) {
        return res.status(400).send('League and season parameters are required');
    }

    try {
        const apiResponse = await getStandingsFromAPI(league, season);
        const standings = apiResponse.response;
        console.log("Api Response",apiResponse);
        //const savedStandings = saveStandings(...standings);

        //res.json(savedStandings);
        res.json(...standings);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and saving the standings');
    }
};

// const saveStandings = async (standings) => {

//     const savedStandings = [];

//     for (const standingData of standings) {
//         const pointsData = new pointsModel({
//             for: standingData.points?.for || 0,
//             against: standingData.points?.against || 0,
//         });
//         const savedPoints = await pointsData.save();

//         const countryData = new countryModel({
//             identifier: standingData.country?.id || null,
//             name: standingData.country?.name || "",
//             code: standingData.country?.code || "",
//             flag: standingData.country?.flag || "",
//         });
//         const savedCountry = await countryData.save();

//         const gameData = new gameModel({
//             played: standingData.games?.played || 0,
//             win: {
//                 total: standingData.games?.win?.total || 0,
//                 percentage: standingData.games?.win?.percentage || 0,
//             },
//             lose: {
//                 total: standingData.games?.lose?.total || 0,
//                 percentage: standingData.games?.lose?.percentage || 0,
//             }
//         });
//         const savedGame = await gameData.save();

//         const groupData = new groupModel({
//             name: standingData.group?.name || "",
//             points: standingData.group?.points || 0,
//         });
//         const savedGroup = await groupData.save();

//         const leagueData = new leagueModel({
//             identifier: standingData.league?.id || 0,
//             name: standingData.league?.name || "",
//             type: standingData.league?.type || "",
//             season: standingData.league?.season || "",
//             logo: standingData.league?.logo || ""
//         });
//         const savedLeague = await leagueData.save();

//         const teamData = new teamModel({
//             identifier: standingData.team?.id || 0,
//             name: standingData.team?.name || "",
//             logo: standingData.team?.logo || ""
//         });
//         const savedTeam = await teamData.save();

//         const standing = new standingsModel({
//             league: savedLeague._id,
//             team: savedTeam._id,
//             points: savedPoints._id,
//             group: savedGroup._id,
//             position: standingData.position,
//             stage: standingData.stage,
//             games: savedGame._id,
//             country: savedCountry._id,
//             form: standingData.form,
//             description: standingData.description,
//         });

//         const savedStanding = await standing.save();
//         savedStandings.push(savedStanding);
//         console.log(`Saved standing for team: ${savedStanding}`);
//     }
//     return savedStandings;
// // }
// const fetchData = async (req, res) => {
//     try {
        
//         const standings = await standingsModel.find({});
        
        
//         console.log(standings);
        
        
//         res.status(200).json(standings);
//     } catch (error) {
        
//         console.error('Error fetching standings:', error);
//         res.status(500).send('An error occurred while fetching the standings');
//     }
// };

const saveStandings = async (standings) => {
    try {
        const savedStandings = await standingsModel.insertMany(standings);
        return savedStandings;
    } catch (error) {
        console.error('Error saving games:', error);
        throw error;
    }
};

const  postData = async (req, res) => {
    const { league ,season } = req.body;
    

    if (!season || !league) {
        return res.status(400).send('Season and League parameters are required');
    }

    try {
        const apiResponse = await getStandingsFromAPI(league, season);
        console.log(apiResponse);
        const standings = apiResponse.response;
        
        const savedStandings = await saveStandings(...standings);
        
        res.status(201).json(savedStandings);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and saving the standings');
    }
};

const fetchData = async (req, res) => {
    try {
        
        const standings = await standingsModel.find({});
        
        
        console.log(standings);
        
        
        res.status(200).json(standings);
    } catch (error) {
        
        console.error('Error fetching standings:', error);
        res.status(500).send('An error occurred while fetching the standings');
    }
};



// Fetch the latest updated time of standings
const getLastUpdatedStandings = async (req, res) => {
    try {
        const latestStandings = await standingsModel.findOne().sort({ updatedAt: -1 });
        console.log("stadnsdnsan ",latestStandings)
        res.json({ lastUpdated: latestStandings ? latestStandings.updatedAt : null });
    } catch (error) {
        console.error('Error fetching last update time for standings:', error);
        res.status(500).send('Error fetching last update time for standings');
    }
};

module.exports = { getStandings,getLastUpdatedStandings, getStandingsFromAPI, saveStandings , postData ,fetchData };