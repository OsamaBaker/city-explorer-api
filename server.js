'use strict'

// // Importing Services
// Importing express
const express = require('express');

// Importing dotenv
require('dotenv').config();

// Importing CORS
const cors = require('cors');

// Importing axios
const axios = require('axios')



// Importing modules
const getWeather = require('./getWeather')

const getMovies = require('./getMovies')



const server = express();
// Port process
const PORT = process.env.PORT;

server.use(cors());



server.get('/', (req, res) => {
    res.status(200).send('Working')})

server.get('/weather', getWeather)

server.get('/movies', getMovies)

server.get('/*', (req, res) => {
    res.status(404).send('NOT FOUND')
})


// Making a server listen
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})