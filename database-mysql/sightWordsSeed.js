const mysql = require('mysql');
const dbHelpers = require(`./dbHelpers.js`);
console.log(dbHelpers);
const path = require('path');
const dBHelpers = require('./dbHelpers.js')
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'SightWords'
  });




const rootUrl = 'https://site-words-helper.s3-us-west-1.amazonaws.com';
const filePath = 'sight_words_audio';
const fileType = '.mp3';
const defaultWordList = ['and', 'get', 'hi', 'how', 'it', 'set', 'the', 'we', 'who', 'you'];

const audioUrls = dBHelpers.audioUrls(rootUrl, filePath, fileType, defaultWordList);
console.log(audioUrls);

connection.query(
`INSERT INTO Words values (1, '${defaultWordList[0]}', '${audioUrls[0]}'), (2, '${defaultWordList[1]}', '${audioUrls[1]}'), (3, '${defaultWordList[2]}', '${audioUrls[2]}'), (4, '${defaultWordList[3]}', '${audioUrls[3]}'), (5, '${defaultWordList[4]}', '${audioUrls[4]}'), (6, '${defaultWordList[5]}', '${audioUrls[5]}'), (7, '${defaultWordList[6]}', '${audioUrls[6]}'), (8, '${defaultWordList[7]}', '${audioUrls[7]}'), (9, '${defaultWordList[8]}', '${audioUrls[8]}'), (10, '${defaultWordList[9]}', '${audioUrls[9]}')`, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('ok');
  }
});

connection.query(`INSERT INTO Lists values (1, 'default')`, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('inserted');
  }
});


connection.query((`INSERT INTO Lists_Words values (1, 1, 1), (2, 1, 2), (3, 1, 3), (4,1,4), (5,1,5), (6,1,6), (7,1,7), (8,1,8), (9,1,9), (10,1,10)`), (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('inserted');
  }
});