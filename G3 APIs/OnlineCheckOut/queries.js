const Pool = require("pg").Pool;

const pool = new Pool ({
  user: 'laude',
  host: 'localhost',
  database: 'transactions',
  password: 'password',
  port: 5432
});

// const getOrders = function(callback= ()=>{}) {
//   pool.query('SELECT * FROM ORDERS', function(error,result){
//     if(error){
//       return callback(error);
//     }
//     callback(null,result.rows);
//   })
//   pool.end();
// };


// async function getOrders(){
//   try{
//     let response = await pool.query('SELECT * FROM ORDERS');
//     return response.rows;
//   }
//   catch(error){
//     console.log(error);
//   }
// }
//
// async function resultArry(){
//   var result = await getOrders();
//   console.log(result);
//   return result;
// }


module.exports = {
  pool
}
