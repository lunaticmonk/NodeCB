'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
	res.send('Hello World! This is Alex.');
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
	// console.log(req.body);
    if (req.query['hub.mode'] == 'subscribe' &&
      req.query['hub.verify_token'] == 'alex_the_bot') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

app.post('/webhook', function(req, res){
	console.log(req.body);
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});