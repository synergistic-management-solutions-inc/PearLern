var express = require('express');
var routes = express.Router();
var browserify = require('browserify-middleware');
var Path = require('path');

var Helpers = require('./request_handler');
var User = require('./database/models/user.js');

var assetFolder = Path.resolve(__dirname, '../client/public');

module.exports = function(app, passport) {

  //redo once we have some public stuffs
  routes.get('/app-bundle.js',
    // Tell browserify to user reactify as it's JSX compiler
    browserify('./client/app.js', {
      transform: [require('reactify')]
    }));

  //redo once we have some public stuffs
  routes.get('/api/tags-example', function(req, res) {
    res.send(['node', 'express', 'browserify']);
  });

  //Here are all my endpoints! See the README for details
  //on what kind of data is expected/being returned
  routes.get('/users', isLoggedIn, Helpers.getUsers);
  routes.get('/users/*', isLoggedIn, Helpers.getProfile);
  routes.get('/messages/*', isLoggedIn, Helpers.getMessages);
  // routes.post('/signup', Helpers.signUp);
  // routes.post('/signin', Helpers.signIn);
  routes.post('/users/*', isLoggedIn, Helpers.submitProfile);
  routes.post('/messages', isLoggedIn, Helpers.sendMessage);

  routes.post('/signin',
    passport.authenticate('local-login'),
    function(req, res, next) {
      user = req.user;
      if (!user) {
        return res.status(404).json({
          user: "Not Found"
        });
      }
        return res.status(200).json({
          'user' : user,
          authenticated: true
        });
  });

  routes.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        res.status(404).send();
        return next(err);
      } else {
        return res.status(200).json({
          'user' : user,
          authenticated: true
        });
      }
    })(req, res, next);
  });

  routes.get('/logout', function(req, res) {
    console.log('logged out', req.body);
    req.session.destroy(function(err) {
      console.log('ok it worked');
    });
    //passport
    // res.redirect('/');
  });

  routes.use(express.static(assetFolder));

  routes.get('/*', function(req, res) {
    res.sendFile(assetFolder + '/index.html');
  });

  app.use('/', routes);

  function isLoggedIn(req, res, next) {
    console.log('are they authed?????', req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};
