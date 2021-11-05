'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.json({ message: 'hi' });
  });

app.use('/', routes);

app.listen(3000);