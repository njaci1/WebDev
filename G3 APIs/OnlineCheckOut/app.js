const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
let unirest = require('unirest');
const Pool = require("pg").Pool;

const date = require("./getDateTime");
const {pool} = require ("./queries");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/checkout", function(req, res) {
  res.sendFile(__dirname + "/checkout.html");

});

app.post("/checkout", function(req, res) {
  var msisdn = Number(req.body.msisdn);
  const businessShortCode = "174379";
  var amount = Number(req.body.amount);
  console.log(req.body);

let auth = btoa('uD8Ff5UsgMjRVJ11UsXDYFgFZNsLXxAI:SDaZ8NPlISdPLUGW');
  // get passkey
  const options = {
    hostname: 'sandbox.safaricom.co.ke',
    path: '/oauth/v1/generate?grant_type=client_credentials',
    headers: {
      Authorization: 'Basic ' + auth
    }
  }

  https.get(options, (response) => {

    var result = '';
    const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'

    response.on('data', function(chunk) {
      result += chunk;
      const res_body = JSON.parse(result);
      let token = res_body.access_token;

      let encodedPasswd = btoa(businessShortCode+passkey +date.getDayTime());

      //send push request
      let req = unirest('POST', url)
        .headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
        .send(JSON.stringify({
          "BusinessShortCode": 174379,
          "Password": encodedPasswd,
          "Timestamp": date.getDayTime(),
          "TransactionType": "CustomerPayBillOnline",
          "Amount": amount,
          "PartyA": msisdn,
          "PartyB": 174379,
          "PhoneNumber": msisdn,
          "CallBackURL": "https://d18a-197-232-84-142.ngrok.io/callback",
          "AccountReference": "CompanyXLTD",
          "TransactionDesc": "Payment of X"
        }))
        .end(res => {
          if (res.error) throw new Error(res.error);
          console.log(res.raw_body);
        });

      //
    });

    response.on('end', function() {
      console.log(`get token part ${result}`);
    });
  });

  res.send("Complete the checkout on your phone " + msisdn);
});

app.get("/callback",function(req,res){
  console.log(date.getDayTime());

  // const pool = new Pool ({
  //   user: 'laude',
  //   host: 'localhost',
  //   database: 'transactions',
  //   password: 'password',
  //   port: 5432
  // });
pool.query("INSERT INTO ORDERS (order_ref, order_desc,checkout_msisdn,checkout_status_code,checkout_status_desc) VALUES ('order4', 'online checkout','0711000003','0','Success')",
              (err,res)=>{
                if(err){throw err}
                console.log("1 record inserted");
              })

  res.send("Ngrok OK");
});

app.post("/callback", function(req,res){
  console.log('POST /');
  console.dir(req.body);
  var result = req.body.Body.stkCallback.CallbackMetadata;
  console.log(result);
  var resultArry = result.Item;
  var mpesaRef = resultArry[1].Value;
  console.log(mpesaRef);

  res.writeHead(200,{"Content-Type":"application/json"});
  res.end('{"message":"This is a JSON reponse"}');
})

app.listen(3000, function() {
  console.log("Server started and listeninng on port 3000")
});

// INSERT INTO ORDERS (order_ref, order_desc,checkout_msisdn,checkout_status_code,checkout_status_desc)
//   VALUES ('order2', 'online checkout','0711000000','0','Success');
