const express = require("express");
const app = express();

app.get("/", function(request,response){

  response.send("Hello");
});

app.get("/contacts", function(req,res){
  res.send("My contacts");
})

app.listen(3000, function(){console.log("Server successfully started on port 3000")});
