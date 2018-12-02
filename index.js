require('dotenv').config();
var express = require('express');
var app = express();

var path = require ('path');
var bodyParser = require('body-parser');
var passport = require('passport');

var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);

// look for static files
app.use(express.static('./server/static'));
app.use(express.static('./client/dist'));

// parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localRegisterStrategy = require('./server/passport/local-register');
passport.use('local-register', localRegisterStrategy);
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-login', localLoginStrategy);

const api = require('./server/routes/api');
app.use('/api', api);
const auth = require('./server/routes/auth');
app.use('/auth', auth);
const public = require('./server/routes/public');
app.use('/public', public);

app.get('*', function(request, response, next) {
	console.log('Request: [GET]', request.originalUrl);
	response.redirect('/');
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});