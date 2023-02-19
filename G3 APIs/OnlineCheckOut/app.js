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

  // console.log(req.body);

  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Content-Type', 'application/json'); 

  var msisdn = '254724299623'// Number(req.body.msisdn);
  const businessShortCode = "174379";
  var amount = 1 // Number(req.body.amount);
  // console.log(req.body);
  var responseCode 
  var responseDesc
  

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
          "CallBackURL": "https://2053-197-232-84-142.ngrok.io/callback",
          "AccountReference": "CompanyXLTD",
          "TransactionDesc": "Payment of X"
        }))
        .end(res => {
          if (res.error) throw new Error(res.error);
          response =JSON.parse(res.raw_body);
          responseCode = response.ResponseCode;
          responseDesc = response.ResponseDescription;
          console.log(`${msisdn},${amount},${date.getDayTime()},${response.MerchantRequestID},${response.CheckoutRequestID},${response.ResponseCode}`);
          // pool.query(`INSERT INTO ORDERS (order_ref, order_desc,checkout_msisdn,checkout_status_code,checkout_status_desc,merchantrequestid,responsecode)
          // VALUES ('order5', 'online checkout','${msisdn}','${amount}','${date.getDayTime()}','${response.MerchantRequestID}','${response.ResponseCode}')`);

          console.log(res.raw_body);
        });

      //
    });

    response.on('end', function() {
      console.log(`get token part ${result}`);
    });
  });

  res.json({ResultCode: responseCode, ResponseDesc: responseDesc});
});

app.get("/callback",function(req,res){
  console.log(date.getDayTime());
  pool.query("INSERT INTO CALLBACKS(merchantrequestid,resultcode,resultdesc,mpesaref) VALUES('21167-56197456-1','0','Success','QFC5MCR0P9')");

  res.send("Ngrok OK");
});

app.post("/callback", function(req,res){
  console.dir(req.body);
  var result = req.body.Body.stkCallback.CallbackMetadata;
  var stkCallback = req.body.Body.stkCallback
  console.log(`${stkCallback.MerchantRequestID},${stkCallback.CheckoutRequestID},${stkCallback.ResultCode}`);

  console.log(result);
  var resultArry = result.Item;
  var mpesaRef = resultArry[1].Value;
  console.log(mpesaRef);
// pool.query(`INSERT INTO CALLBACKS(merchantrequestid,resultcode,resultdesc,mpesaref) VALUES('${stkCallback.MerchantRequestID}','${stkCallback.ResultCode}','${stkCallback.ResultDesc}','${mpesaRef}')`);
//   // INSERT INTO CALLBACKS(merchantrequestid,resultcode,resultdesc,mpesaref) VALUES(${})

  res.writeHead(200,{"Content-Type":"application/json"});
  res.end('{"message":"This is a JSON reponse"}');
})

app.listen(3008, function() {
  console.log("Server started and listeninng on port 3000")
});

// INSERT INTO ORDERS (order_ref, order_desc,checkout_msisdn,checkout_status_code,checkout_status_desc)
//   VALUES ('order2', 'online checkout','0711000000','0','Success');
