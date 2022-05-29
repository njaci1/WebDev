//jshint esversion:6

// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");
const https = require("https");

const app = express();

app.set('view engine', 'ejs');

// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/MPesaTranactionsDB");

const paymentSchema = mongoose.Schema(
  {receiptNO:String,
  amount: Number,
  cust_name: String}
);

const Transaction = mongoose.model("Transaction", paymentSchema);


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'transactions',
  password: 'password',
  port: 5432,
})

app.get("/", function(req,res) {
  res.send("received something");

  pool.query('SELECT * FROM orders',function(err,result){
    if(err){
      console.log(err);
    }else {
      console.log(result.rows);
    }
  })

});


app.get("/test", function(req,res) {
  console.log("testing");
  res.sendFile(__dirname + "/index.html");
});

app.post("/confirmation", function(req,res) {
  console.log(req.body);

  const orderid = req.body.TransID;
  const amount = req.body.TransAmount;

  pool.query('INSERT INTO orders (orderid, amount) VALUES ($1, $2)',[orderid,amount], function(err,result){
    if(err){console.log(err);}else {
      console.log("inserted successfully");

      const response = {"ResultCode":0,"ResultDesc":"Accepted"};
      res.send(response);
    }
  })


//   const trans = new Transaction({receiptNO:req.body.TransID},
//   {amount:req.body.TransAmount},
//     {cust_name:req.body.FirstName});
//
//   Transaction.create(trans,function(err){
//     if(err){
//       console.log(err);
//       const response = {"ResultCode":1,"ResultDesc":"Rejected"}
//       res.send(response);
//     }else {
//       const response = {"ResultCode":0,"ResultDesc":"Accepted"}
//
//       res.send(response);
//     }
  });
//
// });

app.post("/validation", function(req,res) {
  console.log(req.body);

  let id = req.body.BillRefNumber;

  pool.query('SELECT identifier FROM identity WHERE identifier = $1',[id] ,function(err,result){
    if(err){
      console.log(err);
    }else {
      console.log(result.rows[0].identifier);

      const response = {"ResultCode":0,"ResultDesc":"Accepted"};

      res.send(response);
    }
  })




  // const trans = new Transaction({receiptNO:req.body.TransID},
  // {amount:req.body.TransAmount},
  //   {cust_name:req.body.FirstName});

  // trans.save(function(err){
  //   if(err){
  //     console.log(err);
  //     const response = {"ResultCode":1,"ResultDesc":"Rejected"}
  //     res.send(response);
  //   }else {
  //     const response = {"ResultCode":0,"ResultDesc":"Accepted"}
  //
  //     res.send(response);

  });



app.listen(3000,function(){
  console.log("listening on port 3000");
})
