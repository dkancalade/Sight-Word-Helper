/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const mysql = require('mysql');

const dbHelpers = require(`../dbHelpers.js`);
// const path = require('path');
const kindergartenWords = require('../data/kindergartenWords.js');
const kindergartenCourse = require('../data/kindergartenCourse.js');

const kindergartenLists = ['red', 'orange', 'yellow', 'green', 'light blue', 'blue', 'purple', 'violet', 'pink', 'white'];
const courseName = 'kindergarten';

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
const kindergartenWordsQuery = dbHelpers.insertWords(kindergartenWords, audioUrls);
const kindergartenListsQuery = dbHelpers.insertLists(kindergartenLists, courseName);
const kindergartenWordListQuery = dbHelpers.insertListWord(kindergartenCourse);


// course insertion
connection.query(`INSERT INTO Courses (name) VALUES ('${courseName}')`, (err) => {
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
connection.query(kindergartenWordListQuery, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('inserted');
  }
});

connection.end();