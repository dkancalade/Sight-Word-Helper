/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
const path = require('path');

const createAudioFileUrls = (root, filePath, type, wordList) => {
  const urls = [];
  for (const word of wordList) {
    const url = path.join(root, filePath, `${word}${type}`);
    urls.push(url);
  }
  return urls;
};

const buildWordsInsertQuery = (words, urls) => {
  let queryString = '';
  if (words.length !== urls.length) {
    queryString = 'error, word and url lists don\'t match';
  } else {

    queryString = 'INSERT INTO Words (name, url) values ';
    for (let i = 0; i < words.length; i++) {
      queryString += `(${words[i]}, ${urls[i]}), `;
    }

  }
  return queryString;
};

const buildListInsertQuery = (names, course) => {
  let queryString = 'INSERT INTO Lists (name, course_id) values ';
  for (let i = 0; i < names.length; i++) {
    queryString += `(${names[i]}, (SELECT id from Courses WHERE name = ${course}) ), `;
  }
  return queryString;
};

module.exports = {
  audioUrls: createAudioFileUrls,
  insertWords: buildWordsInsertQuery,
  insertLists: buildListInsertQuery
 };

