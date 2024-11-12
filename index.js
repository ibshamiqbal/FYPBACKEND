const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const path = require('path');
const {standingsRoute} = require('./routes/standings.route.js')
const {gamesRoute} = require('./routes/games.route.js');
const { authRoute } = require('./routes/auth.route.js');
const {streamRoute} = require('./routes/stream.route.js');
const { h2hRoute } = require('./routes/h2h.route.js');
const { userRoute } = require('./routes/user.route.js');
const { playerRoute } = require('./routes/players.route.js');
const { newsRoute } = require('./routes/news.route.js');
const { liveScoreRoute } = require('./routes/livescore.route.js');


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine" , "ejs")

const port = process.env.PORT || 8080;
const dbURL = process.env.MONGO_DB_URL;
const secretKey = process.env.SESSION_SECRET;

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));





app.use("/standings",standingsRoute)

app.use("/games",gamesRoute)

app.use('/auth' , authRoute )

app.use('/stream', streamRoute )

app.use('/h2h' , h2hRoute)

app.use('/user' , userRoute)

app.use('/player' , playerRoute)

app.use('/news' , newsRoute)

//app.use('/livescore' , liveScoreRoute)



mongoose
    .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});