require('dotenv').config();
const axios = require('axios');
const gamesModel = require('../models/game.model.js');



const getGamesFromAPI = async (season, league) => {
    const rapidapiurl = 'https://api-basketball.p.rapidapi.com/games?season=2024-2025&league=12';
    const headers = {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST
    };

    try {
        const response = await axios.get(rapidapiurl, { headers });
        console.log(JSON.stringify(response.data));
        return response.data
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw error;
    }
};



const getGames = async (req, res) => {
    const league = 12;
    const season = "2021-2022";
    // const date = "2019-11-26";

    if (!season || !league ) {
        return res.status(400).send('Season and League parameters are required');
    }

    try {
        const apiResponse = await getGamesFromAPI(season, league);
        const games = apiResponse.response;
        console.log("Api Response",apiResponse);
        res.json(games);
       
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and saving the games');
    }
};

// const saveGames = async (games) => {
//     const savedGames = [];

//     for (const gameData of games) {


//         const game = new gamesModel({
//             identifier: gameData.id,
//             date: gameData.date,
//             time: gameData.time,
//             timestamp: gameData.timestamp,
//             timezone: gameData.timezone,
//             stage: gameData.stage,
//             week: gameData.week,
//             status: {
//                 long: gameData.status?.long || "",
//                 short: gameData.status?.short || "",
//                 timer: gameData.status?.timer || null
//             },
//             league: {

//             identifier: gameData.league?.id || 0,
//             name: gameData.league?.name || "",
//             type: gameData.league?.type || "",
//             season: gameData.league?.season || "",
//             logo: gameData.league?.logo || "",
//             },

//             country: {
//                 identifier: gameData.league.country?.id || null, 
//                 name: gameData.league.country?.name || "",
//                 code: gameData.league.country?.code || "",
//                 flag: gameData.league.country?.flag || "",
//             },
//             teams: {
//                 home: {
//                 identifier: gameData.teams?.home?.id || 0,
//                 name: gameData.teams?.home?.name || "",
//                 logo: gameData.teams?.home?.logo || ""
//             },
//             away: {
//                 identifier: gameData.teams?.away?.id || 0,
//                 name: gameData.teams?.away?.name || "",
//                 logo: gameData.teams?.away?.logo || ""
//             }
//             },
//             scores: {
//                 home: {
//                 quarter_1: gameData.scores?.home?.quarter_1 || 0,
//                 quarter_2: gameData.scores?.home?.quarter_2 || 0,
//                 quarter_3: gameData.scores?.home?.quarter_3 || 0,
//                 quarter_4: gameData.scores?.home?.quarter_4 || 0,
//                 over_time: gameData.scores?.home?.over_time || null,
//                 total: gameData.scores?.home?.total || 0,
//             },
//                away: {
//                 quarter_1: gameData.scores?.away?.quarter_1 || 0,
//                 quarter_2: gameData.scores?.away?.quarter_2 || 0,
//                 quarter_3: gameData.scores?.away?.quarter_3 || 0,
//                 quarter_4: gameData.scores?.away?.quarter_4 || 0,
//                 over_time: gameData.scores?.away?.over_time || null,
//                 total: gameData.scores?.away?.total || 0,
//             }

//             }
//         });

//         const savedGame = await game.save();
//         savedGames.push(savedGame);
//         console.log(`Saved game with ID: ${savedGame._id}`);
//     }

//     return savedGames;
// }

// const postData = async (req, res) => {
//     const game = new gamesModel(getGamesFromAPI());
  
//     try {
//       const newGame = await game.save();
//       res.status(201).json(newGame);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };






const saveGames = async (games) => {
    try {
        const savedGames = await gamesModel.insertMany(games);
        return savedGames;
    } catch (error) {
        console.error('Error saving games:', error);
        throw error;
    }
};

const  postData = async (req, res) => {
    const { league, season} = req.body;

    if (!season || !league ) {
        return res.status(400).send('Season and League parameters are required');
    }

    try {
        const apiResponse = await getGamesFromAPI(season, league);
        const games = apiResponse.response;
        const savedGames = await saveGames(games);

        res.status(201).json(savedGames);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching and saving the games');
    }
};


const fetchData = async (req, res) => {
    try {

        const games = await gamesModel.find({});
        
        console.log(games);
        
        res.status(200).json(games);
    } catch (error) {
        
        console.error('Error fetching games:', error);
        res.status(500).send('An error occurred while fetching the games');
    }
};



// Get last update time of the games
const getLastUpdatedGame = async (req, res) => {
    try {
        const latestGame = await gamesModel.findOne().sort({ updatedAt: -1 });
        if (latestGame) {
            res.json({ lastUpdated: latestGame.updatedAt });
        } else {
            res.json({ lastUpdated: null });
        }
    } catch (error) {
        console.error('Error fetching last update time for games:', error);
        res.status(500).send('Error fetching last update time for games');
    }
};

module.exports = { getGamesFromAPI, getGames, saveGames, postData, fetchData, getLastUpdatedGame };