var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var mongoose = require("../database/config");

var routes = express.Router()

//redo once we have some public stuffs
routes.get('/app-bundle.js',
  browserify('./client/app.js'))

//redo once we have some public stuffs
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'mithril'])
})

routes.post('/signup', function(req, res) {
  var user = {};
  user.username = req.body.username;
  user.password = req.body.password;

  //actually create user
  //grab ID from our friend the DB

  //testing code, delete later
  user.id = 1;

  res.status(201).send(user);
})

routes.post('/signin', function(req, res) {
  var user = {};
  user.username = req.body.username;
  user.password = req.body.password;

  //verify user exists/correct password

  //testing code, delete later
  user.id = 1;

  res.status(200).send(user);
})

var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))

if (process.env.NODE_ENV !== 'test') {

  routes.get('/*', function(req, res) {
    res.sendFile(assetFolder + '/index.html')
  })



  var app = express()

  app.use(require('body-parser').json())
  app.use('/', routes)

  app.use(function(req, res, next) {
    req.mango = mongoose;
    next();
  });

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
} else {

  module.exports = routes
}
