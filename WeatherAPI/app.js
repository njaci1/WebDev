const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  console.log(req.headers);
  console.log(req.body);

  const apiKey = "c022d502f9399fce90cb300da543a6e0";
  const units = "metric";
  const city = req.body.cityName;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(resp) {
    resp.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const city = weatherData.name;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The weather in " + city + " is " + temp + " degrees</h1>", "<h2> The weather is " + desc + "</h2>");
      res.write("<h2> The weather is " + desc + "</h2>");
      res.write("<img src =" + imgURL + ">");
      res.send();
    });
  });
});

// app.get("/", function(req,res){
//
//   const apiKey = "c022d502f9399fce90cb300da543a6e0";
//   const units = "metric";
//   const city = "city";
//
//   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units="+ units;
//   https.get(url, function(resp){
//     resp.on("data", function(data){
//       const weatherData = JSON.parse(data);
//       console.log(weatherData.main.temp);
//       console.log(weatherData.weather[0].description);
//       console.log(weatherData.main.temp);
//       console.log(weatherData.weather[0].icon);
//       const temp = weatherData.main.temp;
//       const city = weatherData.name;
//       const desc = weatherData.weather[0].description;
//       const icon = weatherData.weather[0].icon;
//       const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//
//       res.write( "<h1>The weather in " + city + " is " + temp + " degrees</h1>", "<h2> The weather is "+ desc + "</h2>");
//       res.write("<h2> The weather is "+ desc + "</h2>");
//       res.write("<img src =" + imgURL +">");
//       res.send();
//     })
//     console.log(resp.statusCode);
//
//   });
//   // res.sendFile(__dirname + "/index.html");
// })


app.listen(3000, function() {
  console.log("App started succefully on port 3000")
});
