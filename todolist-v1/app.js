//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

let toDoList = ["Prep", "Cook", "Eat"];
let workToDoList = ["Goal set","Email Reply","One More Skill"];

app.get("/", function(req, res) {

  // All this code moved to a module on date.js
  // const today = new Date();
  // const currentDay = today.getDay();
  //
  // function getDayName(today) {
  //   const options = {
  //     weekday: 'long',
  //     month: 'long',
  //     day: 'numeric'
  //   };
  //   let day = today.toLocaleDateString("en-US", options);
  //   return day;
  // }

  const day = date.getDate();


  res.render("list", {
    dayOfWeek: day,
    newListItem: toDoList
  });
});

app.post("/", function(req, res) {

  let newTask = req.body.newItem;
  let button = req.body.button;

  if(button === "Work"){

    workToDoList.push(newTask);
    res.redirect("/work");
  }else{
    toDoList.push(newTask);
    res.redirect("/");
  }

  // newTask = req.body.newItem;
  // toDoList.push(newTask);
  // res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list",{dayOfWeek: "Work",newListItem:workToDoList});
});

// // app.post("/work",function(req,res){
// //   newTask = req.body.newItem;
// //   workToDoList.push(newTask);
// //   res.redirect("/work");
// });
app.get("/about",function(req,res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("App running on port 3000");
});
