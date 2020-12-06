const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const { watsonApiKey } = require('./watson_api_key.js');
const kindergartenWords = require('../data/kindergartenWords');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({ apikey: watsonApiKey })
});

const kinderParams = kindergartenWords.map((word) => {
  const obj = {
    text: word,
    accept: 'audio/mp3',
    voice: 'en-US_AllisonVoice',
  };
  return obj;
});

for (let i = 0; i < kinderParams.length; i++) {
  textToSpeech
    .synthesize(kinderParams[i])
    .then(response => {
      const audio = response.result;
      audio.pipe(fs.createWriteStream(`./kindergarten_words_audio/${kinderParams[i].text}.mp3`));
    })
    .catch(err => {
      return err;
    });
}