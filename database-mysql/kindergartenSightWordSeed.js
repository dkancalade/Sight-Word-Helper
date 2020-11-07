const mysql = require('mysql');
const dbHelpers = require(`./dbHelpers.js`);
const path = require('path');
const kindergartenWords = require('../kindergartenWordSeed.js');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'SightWords'
  });


const rootUrl = 'https://site-words-helper.s3-us-west-1.amazonaws.com';
const filePath = 'sight_words_audio';
const fileType = '.mp3';

const audioUrls = dbHelpers.audioUrls(rootUrl, filePath, fileType, kindergartenWords);

const buildInsertQuery = (words, urls) => {
  let queryString = '';
  if (words.length !== urls.length) {
    queryString = 'error, word and url lists don\'t match';
  } else {

    queryString = 'INSERT INTO Words values';
    for (let i = 0; i < words.length; i++) {
      queryString = queryString + `(${words[i]}, ${urls[i]})`;
    }

  }
  return queryString;
};

const kindergartenWordsQuery = buildInsertQuery(kindergartenWords, audioUrls);

connection.query(
  kindergartenWordsQuery, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('ok');
  }
});

connection.query(`INSERT INTO Lists values ('default')`, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('inserted');
  }
});


// connection.query((`INSERT INTO Lists_Words values (1, 1, 1), (2, 1, 2), (3, 1, 3), (4,1,4), (5,1,5), (6,1,6), (7,1,7), (8,1,8), (9,1,9), (10,1,10)`), (err) => {
//   if (err) {
//     console.log('error', err);
//   } else {
//     console.log('inserted');
//   }
// });