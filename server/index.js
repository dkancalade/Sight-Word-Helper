const express = require('express');
const items = require('../database-mysql');
const path = require('path');
const graphqlExpress = require('apollo-server-express');
const myGraphQLSchema = require('./api/root.js');

const app = express();

app.use('/graphql', express.json(), graphqlExpress({ schema: myGraphQLSchema }));

app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../react-client/dist'));

// app.get('/default/:word', function (req, res) {
//   const url= path.join(__dirname,`sight_words_audio/sight_words_${req.params.word}.mp3` );
//   res.sendFile(url, (err) => {
//     if (err) {
//       console.log(`error in get route default, ${req.params}`, error);
//       res.end();
//     }
//   })
// });
  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });

 //watson url: https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/919657ee-cdba-4f9a-bfc8-c194ef9145e7

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


// curl https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/919657ee-cdba-4f9a-bfc8-c194ef9145e7