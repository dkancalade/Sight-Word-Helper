const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'SightWords'

});

connection.connect();

const root = {
  courses: () => {
    const getCourseList = async () => {
      const coursesPromise = new Promise ((resolve, reject) => {
        connection.query(`Select * from Courses`, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results)
          }
        });
      });
      let courseListQuery = await coursesPromise;
      const courseList = courseListQuery.map((course) => {
        return course.name;
      });
      return courseList;
    }

    return getCourseList();
  },
  // getListsFromCourse: ({course}) => {
  //   connection.query(`Select * from ${course}`, function (error, results) {
  //     if (error) {
  //       throw error;
  //     } else {
  //       return results;
  //     }
  //   })
  // },
  // getWordsFromList: ({list}) => {
  //   connection.query(`Select Words.word, Words.url from ((Words INNER JOIN Lists_Words ON Words.id = Lists_Words.words_id) INNER JOIN Lists Lists_Words.List_id = Lists.id)`, function (error, results) {
  //     if (error) {
  //       throw error;
  //     } else {
  //       return results;
  //     }
  //   });
  // }

};



module.exports = root;
