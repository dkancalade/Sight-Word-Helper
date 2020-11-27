const mysql = require('mysql');
const
{ Promise } = require('bluebird');
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

      const courseListQuery = await coursesPromise;
      const courseList = courseListQuery.map((course) => {
        return course.name;
      });
      return courseList;
    };

    return getCourseList();
  },
  course: (course) => {
    getCourseInfo = async (course) => {
      let res;

      const courseListPromise = new Promise((resolve, reject) => {
        connection.query(`Select * from Lists INNER JOIN Courses where Lists.course_id = Courses.id and Courses.name = '${course}'`, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });



      })
      let courseListQuery = await courseListPromise;
      console.log('courseListQuery', courseListQuery[0]);
      return courseListQuery;
    };
    return getCourseInfo(course);
  }

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
