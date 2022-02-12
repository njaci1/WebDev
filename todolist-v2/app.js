//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB");

mongoose.connect("mongodb+srv://admin-admin:test123@cluster0.vfdko.mongodb.net/todolistDB");

//schema is for creating structure of the data to be enforced by the application
const itemsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Item = mongoose.model("Item", itemsSchema);

const listSchema = mongoose.Schema(
  {name:String,items:[itemsSchema]}
);

const DynamicList = mongoose.model("List",listSchema);

//model is for instantiating the db, ts's a constructor. creates an instance of a document as per referenced schema.



const task1 = new Item({
  name: "Buy Food"
});

const task2 = new Item({
  name: "Cook Food"
});

const task3 = new Item({
  name: "Eat Food"
});

// const deftList = [task1,task2,task3];
const deftList = [];

app.get("/", function(req, res) {
  const tasks = [];

  const day = date.getDate();
  Item.find(function(err, items) {
    if (err) {
      mongoose.connection.close();

    } else {

      items.forEach(function(item) {
        tasks.push(item.name);
      });
    }
    console.log(tasks);

    res.render("list", {
      listTitle: day,
      newListItems: tasks
    });

  });

});


app.post("/", function(req, res) {

  // console.log(req.body);

  const itemName = _.capitalize(req.body.newItem);
  const listDB = req.body.list;

  const item = new Item({
    name:itemName
  })

  if (req.body.list !== date.getDate()) {

    DynamicList.findOne({name:listDB},function(err,result){
      if(!err){
        let db = result; // this is an array of currently existing items

        db.items.push(item);
        console.log(db.items);
        db.save();

        res.redirect("/" + listDB);

      }else {
        console.log(err);
      }

    })


  } else {
    const newTask = new Item({
      name: _.capitalize(itemName)

    });
    newTask.save();
    res.redirect("/");
  }

});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/delete", function(req, res) {

  const item = req.body.deletedItem;

  if (req.body.list !== date.getDate()) {

    DynamicList.findOneAndUpdate({name:req.body.list},{$pull: {items: {name:item}}},function(err,result){
      if(!err){

        res.redirect("/"+ req.body.list);

      }else {
        console.log(err);
      }

    })

  } else {
    console.log(req.body);
    let deletedTask = req.body.deletedItem;

    Item.deleteOne({name:deletedTask},function(err){
      if(err){console.log(err);}else{console.log("deleted "+ deletedTask);}
    });
    res.redirect("/");
    };

});

app.get("/:customList", function(req,res){

  const customListName = _.capitalize(req.params.customList);

  DynamicList.findOne({name:customListName},function(err,foundList){
    if(!err){
      if(!foundList){
        const listItems = [];
        const list = new DynamicList({name:customListName, items:deftList});
        list.save();

        res.render("list",{  listTitle: customListName,
                            newListItems: listItems});

      }else {
        // console.log(foundList);
        const listItems = [];
        const collection = foundList.items;
        // console.log(collection);
        collection.forEach(function(item){
          listItems.push(item.name);
        });

        // console.log(listItems);
        res.render("list",{  listTitle: customListName,
                            newListItems: listItems});
      }
    }
  })

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
