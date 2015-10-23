var LocalStrategy = require('passport-local').Strategy;

var User = require('../database/models/user.js');


module.exports = function(passport) {
  //for sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    //process of sign up -
    function(req, username, password, done) {
      //node. asnychc
      process.nextTick(function() {
        User.findOne({
          username: username
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, false, req.flash('signupMessage', 'username takend'));
          } else {
            var newUser = new User();
            newUser.username = username;
            newUser.password = password;

            newUser.save(function(err) {
              if (err) {
                throw err;
              } else {
                return done(null, newUser);
              }
            });
          }
        });
      });
    }));

  passport.use('local-login', new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    function(req, username, password, done) {
      process.nextTick(function() {
        User.findOne({
          'username': username
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, req.flash('loginMessage', 'No User'));
          }
          if (user.password !== password) {
            return done(null, false, req.flash('loginMessage', 'Bad Pass'));
          }
          return done(null, user);
        });
      });
    }

  ));

};
