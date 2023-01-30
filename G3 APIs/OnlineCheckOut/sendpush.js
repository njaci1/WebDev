let unirest = require('unirest');

//send push request
// let req =
function sendPushRequest() {
  return new Promise((resolve, reject) => {
    unirest('POST', url)
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
        "CallBackURL": "https://84ba-197-232-84-142.ngrok.io/callback",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of X"
      }))
      .end(res => {
        if (res.error) throw new Error(res.error);
        response = JSON.parse(res.raw_body);
        // console.log(`${msisdn},${amount},${date.getDayTime()},${response.MerchantRequestID},${response.CheckoutRequestID},${response.ResponseCode}`);
        pool.query(`INSERT INTO ORDERS (order_ref, order_desc,checkout_msisdn,checkout_status_code,checkout_status_desc,merchantrequestid,responsecode)
        VALUES ('or1', 'online checkout','${msisdn}','${amount}','${date.getDayTime()}','${response.MerchantRequestID}','${response.ResponseCode}')`);
        return resolve(response.MerchantRequestI);
      });
  });
}
sendPushRequest().then((body) => body).catch((error) => error);


module.exports = {
  sendPushRequest
}
