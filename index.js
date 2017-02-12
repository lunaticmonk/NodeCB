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
    // res.send('Hello world, I am a chat bot')
    if (req.query['hub.verify_token'] == 'alex_the_bot') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token');
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