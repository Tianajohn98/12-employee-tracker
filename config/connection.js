const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "birdgymmy",
  database: "employee_management",
});

module.exports = db;
