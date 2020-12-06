const mysql = require('mysql');
const { Promise } = require('bluebird');

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
  course: async (course) => {
    const getCourseInfo = async () => {
      const courseListPromise = new Promise((resolve, reject) => {
        connection.query(`Select Lists.name from Lists INNER JOIN Courses where Lists.course_id = Courses.id and Courses.name = '${course.name}'`, (error, results) => {
          if (error) {
            reject(error);
          } else {

            resolve(results);
          }
        });
      });
      const listsQuery = await courseListPromise;
      const lists = await listsQuery.map((list) => {
        return list.name;
      });
      return lists;
    };
    const info = await getCourseInfo(course);
    return { name : info };
  },
  words: async (listName) => {
    const getWordsFromList = async () => {

      const wordListPromise = new Promise((resolve, reject) => {
        connection.query(`Select Words.name, Words.url from ((Words INNER JOIN Lists_Words ON Words.id = Lists_Words.word_id) INNER JOIN Lists ON Lists_Words.list_id = Lists.id and Lists.name = '${listName.listName}')`, function (error, results) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      const wordList = await wordListPromise;
      return wordList;
    };
    const wordListQuery = await getWordsFromList(listName);
    return wordListQuery;
    }
  };



module.exports = root;
