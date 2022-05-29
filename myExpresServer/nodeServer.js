const http = require("http");
const host = 'localhost';
const port = 8000;

const requestListener = function(req,res){
  console.log(req.raw_body);
  res.setHeader("Content-Type", "Apllication/json");
  res.writeHead(200);
  res.end('{"message":"This is a JSON reponse"}');
}

const server = http.createServer(requestListener);

server.listen(port,host, () => {
  console.log("server started on port "+ port);
});
