const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'transactions',
  password: 'password',
  port: 5432,
})

module.exports.test = function(req,res){
  pool.query('SELECT * FROM orders', function(err,result){
    if(err){
      console.log(err);
    }else {
      return json(result);
    }

  })
}

module.exports.test1 = function(){
  let obj = {name:"test", name2:"nrb"};
  return obj;
}
