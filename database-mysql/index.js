const mysql = require('mysql');
const credentials = require('../credentials.js');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : `${database.login}`,
  password : `${database.password}`,
  database : 'SightWords'
});

const selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
