const mysql = require('mysql');

const { database } = require('../../credentials.js');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : `${database.login}`,
  password : `${database.password}`,
  database : 'SightWords'

});

connection.connect();
const myCourse = "kindergarten";
connection.query(`Select * from Lists INNER JOIN Courses where Lists.course_id = Courses.id and Courses.name = '${myCourse}'`, function (error, results) {
  if (error) {
    return error;
  }
    // console.log('results', results);
    return results;
});


