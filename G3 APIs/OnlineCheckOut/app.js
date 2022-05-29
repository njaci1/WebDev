const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
let unirest = require('unirest');
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

  function getDayTime(){
    let currentDay = new Date();
    let year = String(currentDay.getFullYear());
    let month = String((currentDay.getMonth()+1));
    let day = String(currentDay.getDate());
    let hour = String(currentDay.getHours());
    let minutes = String(currentDay.getMinutes());
    let seconds = String(currentDay.getSeconds());

    if(month < 10){month = "0"+month;}
    if(day < 10){day = "0"+day;}
    if(hour < 10){hour = "0"+hour;}
    if(minutes < 10){minutes = "0"+minutes;}
    if(seconds < 10){seconds = "0"+seconds;}

    let timestamp = year+month+day+hour+minutes+seconds;
    return timestamp;

  }

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
    response.on('data', function(chunk) {
      result += chunk;
      const res_body = JSON.parse(result);
      let token = res_body.access_token;

      let encodedPasswd =btoa('174379'+passkey +getDayTime());
      console.log(passkey);
      console.log(getDayTime());
      console.log(encodedPasswd);

      //send push request
      let unirest = require('unirest');
      let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
        .headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
        .send(JSON.stringify({
          "BusinessShortCode": 174379,
          "Password": encodedPasswd,
          "Timestamp": getDayTime(),
          "TransactionType": "CustomerPayBillOnline",
          "Amount": 1,
          "PartyA": msisdn,
          "PartyB": 174379,
          "PhoneNumber": msisdn,
          "CallBackURL": "https://617e-197-232-84-142.ngrok.io/callback",
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
      console.log(result);
    });
  });

  res.send("Complete the checkout on your phone " + msisdn);
});

app.get("/callback",function(req,res){
  res.send("Ngrok OK");
});

app.post("/callback", function(req,res){
  console.log('POST /');
  console.dir(req.body);
  var result = req.body.Body.stkCallback.CallbackMetadata;
  console.log(result);
  var resultArry = result.Item;
  var mpesaRef = resultArry[1];
  console.log(mpesaRef);

  res.writeHead(200,{"Content-Type":"application/json"});
  res.end('{"message":"This is a JSON reponse"}');
})

app.listen(3000, function() {
  console.log("Server started and listeninng on port 3000")
});
