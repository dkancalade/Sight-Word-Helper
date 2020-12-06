const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'SightWords'

});

connection.connect();
const myCourse = "kindergarten";
const myData = connection.query(`Select * from Lists INNER JOIN Courses where Lists.course_id = Courses.id and Courses.name = '${myCourse}'`, function (error, results) {
  if (error) {
    console.error(error);
    connection.end();
  } else {
    return results;
    connection.end();
  }
});


