const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require("cors");
const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const signin = require('./controllers/Signin');
const register = require('./controllers/Register');
const profile = require('./controllers/GetProfile');
const rank = require('./controllers/Rank');
const getUsers = require('./controllers/ShowUsers')

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

// app.get("/", getUsers.handleShowUsers(db))
app.get("/", (req, res) => {
    res.json("Api Is Working .... ")
})
app.post("/signin", signin.handleSignin(db, bcrypt))
app.post("/register", register.handleRegister(db, bcrypt))
app.get("/profile/:userId", profile.handleProfileGet(db))
app.post("/rank", rank.handleRank(db))
app.post("/faceApi", rank.handleFaceApi)


app.listen(PORT || 55555, () => {
    console.log(`app is Working at port ${PORT}`);
})