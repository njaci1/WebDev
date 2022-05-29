const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
// let unirest = require('unirest');
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.num1);
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var sum = num1 + num2;
  res.send("Thnk you " + sum);
});

app.get("/bmi", function(req, res) {
  res.sendFile(__dirname + "/BMICalc.html");
});

app.post("/bmi", function(req, res) {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var bmi = weight / (height * height);
  res.send("BMI = " + bmi);
});




app.listen(3000, function() {
  console.log("Server started and listeninng on port 3000")
});
