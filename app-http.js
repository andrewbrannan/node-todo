"use strict";

var express = require('express');
var app = new express();
const config = require('./config.js')

var router = require('./controllers/router.js').router;

app.use('/',router);

console.log("starting app!");

app.listen(config.port);
