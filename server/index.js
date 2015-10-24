var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var mongoose = require('./database/config');
var Helpers = require('./request_handler');
var app = express()
var routes = express.Router()

//redo once we have some public stuffs
routes.get('/app-bundle.js',
  // Tell browserify to user reactify as it's JSX compiler
  browserify('./client/app.js', {
    transform: [ require('reactify') ]
  }))

//redo once we have some public stuffs
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify'])
})

routes.post('/signup', Helpers.signUp)
routes.post('/signin', Helpers.signIn)
//this needs to handle users/+username+
routes.post('/users/user', Helpers.submitProfile)

var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))

if (process.env.NODE_ENV !== 'test') {
  app.use(require('body-parser').json())
  app.use(require('body-parser').urlencoded({ extended: true }));

  routes.get('/*', function(req, res) {
    res.sendFile(assetFolder + '/index.html')
  })


  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
} else {

  module.exports = routes
}
