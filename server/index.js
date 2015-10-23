var browserify = require('browserify-middleware');
var express = require('express');
var Path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var Helpers = require('./request_handler');

var configDB = require("./database/database.js");
mongoose.connect(configDB.url);

mongoose.connection.on('error', function(err){
	console.log('Mango problem', err);
});

var routes = express.Router();

//redo once we have some public stuffs
routes.get('/app-bundle.js',
  browserify('./client/app.js', {
    transform: [require('reactify')]
  }));

//redo once we have some public stuffs
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify']);
});


routes.post('/signup', Helpers.signUp);

routes.post('/signin', Helpers.signIn);

var assetFolder = Path.resolve(__dirname, '../client/public');
routes.use(express.static(assetFolder));

if (process.env.NODE_ENV !== 'test') {

  routes.get('/*', function(req, res) {
    res.sendFile(assetFolder + '/index.html');
  });

  var app = express();
  //middleware - executes on any client and server interaction trade
  //marks the request and time on console
  app.use(morgan('dev'));

  app.use(cookieParser());
  //parse our cookie

  app.use(session({
    secret: 'Jang',
    saveUninitialized: true,
    resave: true
  }));
  //saveUninitialized saves session to database for persistence log in
  //if set to true - it will save
  // resave -  if nothing is changed - save it again

  // app.set('view engine', 'ejs');
  // EJS is for testing only - Please be aware

  // require('./routes.js')(app);

  app.use(require('body-parser').json())
  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
} else {

  module.exports = routes
}
