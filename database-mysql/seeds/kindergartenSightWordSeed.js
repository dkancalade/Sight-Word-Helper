const mysql = require('mysql');

const dbHelpers = require(`../dbHelpers.js`);
// const path = require('path');
const kindergartenWords = require('../data/kindergartenWords.js');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'SightWords'
  });

const rootUrl = 'https://site-words-helper.s3-us-west-1.amazonaws.com';
const filePath = 'sight_words_audio';
const fileType = '.mp3';
const courseName = 'kindergarten';
const kindergartenLists = ['red', 'orange', 'yellow', 'green', 'light blue', 'blue', 'purple', 'violet', 'pink', 'white'];
const audioUrls = dbHelpers.audioUrls(rootUrl, filePath, fileType, kindergartenWords);
const kindergartenWordsQuery = dbHelpers.insertWords(kindergartenWords, audioUrls);
const kindergartenListsQuery = dbHelpers.insertLists(kindergartenLists, courseName);
console.log('words', kindergartenWordsQuery);

// course insertion
connection.query(`INSERT INTO Courses values (${courseName})`, (err) => {
  if (err) {
    console.log('error inserting Course', err);
  } else {
    console.log('Course inserted');
  }
});


// lists insertion
connection.query( kindergartenListsQuery, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('inserted');
  }
});

// words insertion
connection.query(
  kindergartenWordsQuery, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('ok');
  }
});


// lists_words insertion
connection.query((`INSERT INTO Lists_Words values (1, 1, 1), (2, 1, 2), (3, 1, 3), (4,1,4), (5,1,5), (6,1,6), (7,1,7), (8,1,8), (9,1,9), (10,1,10)`), (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('inserted');
  }
});