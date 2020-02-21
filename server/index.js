var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// app.get('/sightWords', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });


app.get('/default/:word', function (req, res) {
  const url= path.join(__dirname,`sight_words_audio/sight_words_${req.params.word}.mp3` );
  res.sendFile(url, (err) => {
    if (err) {
      console.log(`error in get route default, ${req.params}`, error);
      // res.sendStatus(201);
      res.end();
    }
  })

  });
  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

