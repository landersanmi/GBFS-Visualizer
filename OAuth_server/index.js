'use strict'
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { initialize } = require("express-openapi");
var swaggerUi = require("swagger-ui-express");
var path = require('path');
var http = require('http');
var oas3Tools = require('oas3-tools');
const YAML = require('yamljs');
var alert = require('alert');
var keys = require('../keys.json');

const SERVER_PORT = 9090;
var app = express();

const swaggerDoc = YAML.load('./api/openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(express.static(__dirname + '/static'));

const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));

app.get('/', function(req, res) {
    res.render('pages/auth');
});


/*  PASSPORT SETUP  */
const passport = require('passport');
var userProfile;
var token;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/*  GOOGLE AUTH  */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
/* ############################################################################################################*/
const GOOGLE_CLIENT_ID = keys['GOOGLE_CLIENT_ID'];
const GOOGLE_CLIENT_SECRET = keys['GOOGLE_CLIENT_SECRET'];
/* ############################################################################################################*/
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:9090/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile = profile;
      token = accessToken;
      return done(null, userProfile, token);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('http://localhost:8080/login?token=' + token );
});


// Initialize the Swagger middleware
http.createServer(app).listen(SERVER_PORT, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', SERVER_PORT, SERVER_PORT);
    console.log('Swagger-ui is available on http://localhost:%d/api-docs', SERVER_PORT);
});

