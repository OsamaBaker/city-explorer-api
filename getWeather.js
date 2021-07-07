'use strict';

const axios = require('axios')

function getWeatherData (req, res) {

    let weather;

    let sQuery = req.query.searchQuery
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WEATHER_API_KEY}`

    axios.get(url).then(response => {
        weather = response.data
        let weatherArr = weather.data.map((item, idx) => {
            return new Forecast(item);
        });
        res.json(weatherArr)
    })
    .catch(error => {
        res.status(500).send(error)
    })
}

class Forecast {
    constructor(allDatesData){
        this.date = allDatesData.valid_date,
        this.description = allDatesData.weather.description
    }
}

module.exports = getWeatherData