const db = require('./db');

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results, fields) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = {
  query
};