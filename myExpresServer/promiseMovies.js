const axios = require("axios");
const fs = require("fs").promises;

axios.get("https://ghibliapi.herokuapp.com/films").then(
  function(response) {
    console.log('successfully got a list of movies');
    movieList = '';
    response.data.forEach((movie) => {
      movieList += `${movie.title},${movie.release_date}\n`
    });
    return fs.writeFile("promisesMovies.csv", movieList)
  }
).then(
  function() {
    console.log('check out the movies in the promisesMovies.csv file');
  }
).catch((err) => {
  console.error(`failed with error ${err}`);
})
