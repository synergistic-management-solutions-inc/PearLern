var User = require('./database/models/user.js');

module.exports = function(app, passport) {

  app.get('/login', function(req, res) {
    //TODO add render page
    res.render("Hello World", {
      message: req.flash('lognInMessage')
    });
  });

  app.post('signIn', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/signUp',
    failureFlash: true
  }));

  app.get('/signup', function(req, res) {
    //TODO add render page
    res.render('Goodbye World', {
      message: req.flash('signUpMessage')
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', //redirect home page
    failureRedirect: '/signUp',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, function(req, res) {
    //TODO add profile page
    res.render("I'm here", {
      user: req.user
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    //passport
    res.redirect('/');
  });

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
