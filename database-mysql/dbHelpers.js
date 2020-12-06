/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
const path = require('path');
const SqlString = require('sqlstring');

const createAudioFileUrls = (root, filePath, type, wordList) => {
  const urls = [];
  for (const word of wordList) {
    const url = path.join(root, filePath, `${word}${type}`);
    urls.push(url);
  }
  return urls;
};

const buildWordsInsertQuery = (words, urls) => {
  const wordList = [...words];
  const urlList = [...urls];
  let queryString = '';
  if (words.length !== urls.length) {
    queryString = 'error, word and url lists don\'t match';
  } else {
    queryString = 'INSERT INTO Words (name, url) values ';
    for (let i = 0; i < wordList.length; i++) {
      queryString +=  `(${SqlString.escape(wordList[i])}, ${SqlString.escape(urlList[i])}), `;
    }
    queryString = queryString.substring(0, queryString.length - 2);
  };
  return queryString;
};
const buildListInsertQuery = (names, course) => {
  let queryString = 'INSERT INTO Lists (name, course_id) VALUES ';
  for (let i = 0; i < names.length; i++) {
    queryString += `('${names[i]}', (SELECT id from Courses WHERE name = '${course}') ), `;
  }
  return queryString.substring(0, queryString.length - 2);
};


const buildListWordQuery = (lists) => {
  let queryString = 'INSERT INTO Lists_Words (list_id, word_id) VALUES ';

  for (const list in lists) {
    const listId = `(SELECT id from Lists where Lists.name = "${list}")`;
    for (const word of lists[list]) {
      const wordId = `(SELECT id from Words where Words.name = "${word}")`;
      queryString = `${queryString} (${listId}, ${wordId}),`;
    }
  }
  return queryString.substring(0, queryString.length - 1);
};

module.exports = {
  audioUrls: createAudioFileUrls,
  insertWords: buildWordsInsertQuery,
  insertLists: buildListInsertQuery,
  insertListWord: buildListWordQuery
 };