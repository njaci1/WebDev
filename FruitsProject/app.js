const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/fruitsDB", {
//   useNewUrlParser: true
// });


// the db schema
const fruitsSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});

//model creates a db into the schema
const Fruit = mongoose.model("Fruit", fruitsSchema);

//first entry into the db

// const mapera = new Fruit({
//   name:"Mapera",
//   rating:81,
//   review:"Booster"
// });
// mapera.save();
// Fruit.insertMany([banana,kiwi,mango],function(err){
//   if (err){
//     console.log(err);
//   }else{
//     console.log("Went well");
//   }
// });
mongoose.connect("mongodb://localhost:27017/personsDB", {
  useNewUrlParser: true
});

const Person = mongoose.model("Person", fruitsSchema);

Person.deleteOne({_id:"61dec7401bedf9dac297e1a0"},function(err){
  if (err) {
    console.log(err);
  }else {
    mongoose.connection.close();
    console.log("Deleted successfully");
  }
});

// Fruit.find(function(err,fruits){
//   if(err){
//     console.log(err);
//     mongoose.connection.close();
//   }else{
//     mongoose.connection.close();
//     fruits.forEach(function(fruit){
//       console.log(fruit.name);
//     });
//
//   }
// });

// Fruit.updateOne({_id:"61dec03870419a9d98deb078"},{name:"Apple"}, function(err){
//   if(err){
//     console.log(err);
//   }else {
//     console.log("Record updated");
//   }
// })
