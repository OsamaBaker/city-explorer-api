"use strict";

const axios = require("axios");

let inMemory = {};

function getMovies(req, res) {
  let movies;
  let sQuery = req.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${sQuery}`;

  if (inMemory[sQuery] !== undefined) {
    let cachedArr = inMemory[sQuery].map((item, idx) => {
        return new Movie(item);
      });
      res.json(cachedArr);
  } else {
    axios
      .get(url)
      .then((response) => {
        movies = response.data.results;
        inMemory[sQuery] = response.data.results;
        let moviesArr = movies.map((item, idx) => {
          return new Movie(item);
        });
        res.json(moviesArr);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
}

class Movie {
  constructor(allMoviesData) {
    (this.title = allMoviesData.title),
      (this.image_url =
        `http://image.tmdb.org/t/p/w342` + allMoviesData.poster_path),
      (this.average_votes = allMoviesData.vote_average);
  }
}

module.exports = getMovies;
