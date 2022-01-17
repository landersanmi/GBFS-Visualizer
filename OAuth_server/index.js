'use strict'
const SERVER_PORT = 9090;
var express = require("express");
var fs = require('fs')
var morgan = require("morgan");
var path = require("path");
const session = require('express-session');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var i18n = require("i18n-express");
var router = require('./controllers/router')

// LOG file
var log = fs.createWriteStream(path.join(__dirname, '/logs/OAuth_server.log'), { flags: 'a' })

// Initialize APP
var app = express();

// APP Config
app.use(morgan('combined', { stream: log }))
app.use(bodyParser.json({ limit: '14MB' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ["en","es", "eu_ES"],
  defaultLang: 'es',
  textsVarName: 'translation'
}));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

// ADD router
app.use(router)

// START APP
app.listen(SERVER_PORT, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', SERVER_PORT, SERVER_PORT);
    console.log('Swagger-ui is available on http://localhost:%d/api-docs', SERVER_PORT);
});

