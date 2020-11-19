const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'SightWords'

});

connection.connect();

const root = {
  Courses: connection.query('SELECT * from Courses', function (error, results) {
    if (error) {
      throw error;
    } else {
      return results;
    }
  }),
  getListsFromCourse: ({course}) => {
    connection.query(`Select * from ${course}`, function (error, results) {
      if (error) {
        throw error;
      } else {
        return results;
      }
    })
  },
  getWordsFromList: ({list}) => {
    connection.query(`Select Words.word, Words.url from ((Words INNER JOIN Lists_Words ON Words.id = Lists_Words.words_id) INNER JOIN Lists Lists_Words.List_id = Lists.id)`, function (error, results) {
      if (error) {
        throw error;
      } else {
        return results;
      }
    }
  }

};


}

};

connection.end();

module.exports = root;
