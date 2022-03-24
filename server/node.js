// Importing MySQL module
const mysql = require("mysql");
  
// Creating connection
let db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "helloworld",
  database: "testapp",
  port: "3308"
});
  
// Connect to MySQL server
db_con.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

db_con.query('SELECT * FROM Climber;', (error, results, fields) => {
    console.log(results)
})
  
module.exports = db_con;


