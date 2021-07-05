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
    let lat = req.query.lat;
    let lon = req.query.lon;
    
    let lookForData = weatherData.find(element => {
        if( element.city_name === city ) {
            return element.city_name
        }
    })
    res.status(200).send(lookForData);

    const cityObj = lookForData.data.map(day => {
        return new Forecast(day.valid_date, day.description)
    })
})

server.get('/*', (req, res) => {
    res.status(404).send('NOT FOUND')
})

class Forecast {
    constructor(date, description){
        this.date = date,
        this.description = description
    }
}


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})