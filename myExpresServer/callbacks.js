const request = require("request");
const fs = require("fs");

request("https://ghibliapi.herokuapp.com/films", function(error, response, body) {
  if (error) {
    console.log(`error when calling API  ${error.message}`);
    return;
  }
  if (response.statusCode != 200) {
    console.error(`Expected status code 200 but received ${response.statusCode}`);
    return;
  }

  console.log("processing the returned list of movies");
  movies = JSON.parse(body);

  let moviesList = '';

  movies.forEach((movie) => {
    moviesList += `${movie.title}, ${movie.release_date}\n`;
  });

  fs.writeFile("callbkMovieList.csv",moviesList, function(error){
    if(error){
      console.log(`failed to write file with error ${error}`);
      return;
    };
    console.log('movies saved to callbkMovieList.csv');
  })


});
