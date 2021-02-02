const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(error => {
  if (error) return console.error('error connecting: ' + error.stack);
  console.log('connected as id ' + db.threadId);
});

module.exports = db;