"use strict";

var express = require('express');
var app = new express();

var router = require('./controllers/router.js').router;

app.use('/',router);

app.listen(3000);
