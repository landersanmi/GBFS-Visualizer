'use strict'
var express = require("express");
var path = require("path");
var logger = require("morgan");
var swaggerUi = require("swagger-ui-express");
var path = require('path');
var keys = require('../keys.json');
var Users = require('./controllers/Users');
const session = require('express-session');
const axios = require('axios');
const YAML = require('yamljs');
const SERVER_PORT = 9090;
var swaggerDoc = YAML.load('./api/openapi.yaml');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var i18n = require("i18n-express");
var geolang=require("geolang-express");

var app = express();

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

// ###########  API  ########### //
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Como no funciona el router añadire las routas a mano
app.get('/api/v1/user/:user_id', function(req, res){
  Users.getUser(req, res, undefined ,req.params.user_id);
});
app.post('/api/v1/user/:user_id', function(req, res){
  Users.postUser(req, res, "", req.body, req.params.user_id);
});

app.get('/', function(req, res){
  res.redirect('/login');
});
app.use('/login', function(req, res) {
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
const { Console } = require("console");
const { State } = require("routing-controllers");
/* ############################## [API KEYS] ##########################################*/
const GOOGLE_CLIENT_ID = keys['GOOGLE_CLIENT_ID'];
const GOOGLE_CLIENT_SECRET = keys['GOOGLE_CLIENT_SECRET'];
/* ####################################################################################*/

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
  async function(req, res) {
    // Successful authentication, redirect success.
    var userInfo = { _id: userProfile['id'],
                 full_name: userProfile['displayName'],
                 email: userProfile['emails'],
              }
    console.log(userInfo);
    console.log(userInfo['_id']);

    // Peticion getUser
    const getUserRequest = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };
    // Peticion postUser
    const postUserRequest = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      body: userInfo
    };
    let userUrl = 'http://127.0.0.1:9090/api/v1/user/' + userInfo['_id'];

    (async () => {
      const user = await axios.get(userUrl, getUserRequest);
      // Si el usuario llega como 'undefined', significa que no existe en la
      // BD por lo que lo añadiremos
      if(user.data === 'undefined'){
        (async () => {
          const response = axios.post(userUrl, postUserRequest);
          console.log(response);
        })();
      }else{
        console.log("El usuario existe " + user);
      }
    })();
    
    res.redirect(301,'http://localhost:8080/login?token=' + token);

});


app.listen(SERVER_PORT, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', SERVER_PORT, SERVER_PORT);
    console.log('Swagger-ui is available on http://localhost:%d/api-docs', SERVER_PORT);
});

