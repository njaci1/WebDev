
const express = require("express");

const app = express();



app.get("/",function(req,res){
  res.send("Hey Hey!");
});

app.listen(3000, "Server successfully started on port 3000");
