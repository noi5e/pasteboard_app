require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').Server(app)

const path = require('path')
const fs = require('fs')
const session = require('express-session')
const bodyParser = require('body-parser')
const socketio = require('socket.io')

// passport.js
const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy

// mongo & mongoose
const mongo = require('mongodb').MongoClient
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

// static files
app.use(express.static('./dist'))

// parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }))

// intialize passport & load passport strategy
app.use(passport.initialize());
const githubLoginStrategy = require('./server/passport/github-login')
passport.use('github-login', githubLoginStrategy)

// app.use(cors({
// 	origin: 
// }))

let store = new session.MemoryStore

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	store: store
}))

const io = socketio(http)
app.set('io', io)

const auth = require('./server/routes/auth')
app.use('/auth', auth)
const public = require('./server/routes/public')
app.use('/public', public)
const api = require('./server/routes/api')
app.use('/api', api)

app.get('/*', function(request, response, next) {
	response.sendFile(path.join(__dirname + '/dist/index.html'))
})

http.listen(process.env.PORT || 8080, function() {
	console.log('Example app listening on port 8080!')
})