"use strict";

var express = require('express');
var app = new express();

var router = require('./routers/router.js').router;

app.use('/',router);

app.listen(3000);
