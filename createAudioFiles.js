const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { watson_api_key } = require('./watson_api_key.js');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');
const kindergartenWords = require('./kindergartenWordSeed');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({ apikey: watson_api_key })
});


// const synthesizeParams = {
//   text: 'Hello from IBM Watson',
//   accept: 'audio/mp3',
//   voice: 'en-US_AllisonVoice',
// };

let kinderParams = kindergartenWords.map((word) => {
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
      audio.pipe(fs.createWriteStream(`./sight_words_audio/${kinderParams[i].text}.mp3`));
    })
    .catch(err => {
      console.log('error:', err);
    });
}