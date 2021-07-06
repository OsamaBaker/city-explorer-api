'use strict'

const express = require('express');
require('dotenv').config();

const cors = require('cors');

// const weatherData = require('./data/weather.json');

const axios = require('axios')



const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).send('Working')})

server.get('/weather', getWeatherData)

server.get('/movies', getMovies)

server.get('/*', (req, res) => {
    res.status(404).send('NOT FOUND')
})

class Forecast {
    constructor(allDatesData){
        this.date = allDatesData.valid_date,
        this.description = allDatesData.weather.description
    }
}

class Movie {
    constructor(allMoviesData){
        this.title = allMoviesData.title,
        this.image_url = `http://image.tmdb.org/t/p/w342`+allMoviesData.poster_path,
        this.average_votes = allMoviesData.vote_average
    }
}

// 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + 

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



function getMovies (req, res) {
    let movies;
    let sQuery = req.query.searchQuery
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${sQuery}`

    axios.get(url).then(response => {
        movies = response.data.results
        let moviesArr = movies.map((item, idx) => {
            return new Movie(item)
        });
        res.json(moviesArr)
    })
    .catch(error => {
        res.status(500).send(error)
    })
}









server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})