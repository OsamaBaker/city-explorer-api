'use strict'

const express = require('express');
require('dotenv').config();

const cors = require('cors');

const weatherData = require('./data/weather.json');



const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).send('Working')})

server.get('/weather', (req, res) => {
    let city = req.query.searchQuery
    console.log(city)
    let lat = req.query.lat;
    let lon = req.query.lon;

    weatherData.find(element => {
       if( element.cityName == city ) {
           return city
       } else{
           return res.status(404).send('NOT FOUND')
       }
    })
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})