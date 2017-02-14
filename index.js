'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.set('port', (process.env.PORT || 5000));
// app.use(bodyParser.json({ verify: verifyRequestSignature }));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  'alex';


// Index route
app.get('/', function (req, res) {
  console.log(req.query);
  // console.log(req.query['hub.verify_token']);
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    console.log(res.body);
    res.sendStatus(403);          
  }
});

// for Facebook verification
// app.get('/webhook/', function(req, res) {
    
// });

app.post('/', function(req, res){
	console.log(req.body);
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});