const path = require('path');
const createAudioFileUrls = (root, filePath, type, wordList) => {
  let urls = [];
  for (let word of wordList) {
    const url = path.join(root, filePath, `${word}${type}`);
    urls.push(url);
  }
  return urls;
};

module.exports = {
  audioUrls: createAudioFileUrls,
 }
