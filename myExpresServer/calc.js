
const express = require("express");

const app = express();



app.get("/",function(req,res){
  res.send("Hey Hey!");
});

const testObjct = {
  Item: [
    { Name: 'Amount', Value: 1 },
    { Name: 'MpesaReceiptNumber', Value: 'QET3SDSXOR' },
    { Name: 'Balance' },
    { Name: 'TransactionDate', Value: 20220529083919 },
    { Name: 'PhoneNumber', Value: 254724299623 }
  ]
}

const item1 = testObjct.Item;
console.log(item1);
const item2 = item1[1]
console.log(item2);
const transactionReceipt = item2.Value
console.log(transactionReceipt);
const transactionDate = item1[3].Value;
console.log(transactionDate);



app.listen(3000,function() {console.log("Server successfully started on port 3000")});
