var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var mongoose = require('./database/config');
var Helpers = require('./request_handler');

var routes = express.Router()

//redo once we have some public stuffs
routes.get('/app-bundle.js',
  browserify('./client/app.js'))

//redo once we have some public stuffs
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'mithril'])
})

routes.post('/signup', Helpers.signUp)
routes.post('/signin', Helpers.signIn)
//this needs to handle users/+username+
routes.post('/users/user', Helpers.submitProfile)

var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))

if (process.env.NODE_ENV !== 'test') {

  routes.get('/*', function(req, res) {
    res.sendFile(assetFolder + '/index.html')
  })

  var app = express()

  app.use(require('body-parser').json())
  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
} else {

  module.exports = routes
}
