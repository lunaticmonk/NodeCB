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
    if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'alex_the_bot') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    // if (req.query['hub.verify_token'] == 'alex_the_bot') {
    //     res.send(req.query['hub.challenge'])
    // }
    // res.send('Error, wrong token')
    res.send('previous webhooks used to be here.');
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
})