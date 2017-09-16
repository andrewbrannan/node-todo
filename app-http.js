"use strict";

var express = require('express');
var app = new express();

var router = require('./controllers/router.js').router;

app.use('/',router);

console.log("starting app!");

app.listen(3000);
