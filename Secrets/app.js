//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 3;

// console.log(process.env.API_KEY);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']})

const User = new mongoose.model("user", userSchema);

app.get("/", function(req, res) {
  res.render("home")
});

app.get("/login", function(req, res) {
  res.render("login")
});

app.get("/register", function(req, res) {
  res.render("register")
});

app.post("/register", function(req, res) {

  const hashedPasswd = bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

    const newUser = new User({
      email: req.body.username,
      password: hash
    });

    newUser.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });

  });

});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
      email: username
    }, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          bcrypt.compare(password, user.password, function(err, result) {
              if (result == true) {
                res.render("secrets")
              } else {
                console.log("wrong password");
                res.render("login_err", {
                  email: username
                })
              };//last else
          }//bcrypt callback
        )
      } //2nd if
    } //1st else
  }); //findOne
}); //post


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
