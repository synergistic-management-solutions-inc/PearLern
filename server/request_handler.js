var User = require('./database/models/user.js');

exports.signUp = function(req, res) {
  var userInfo = {};
  userInfo.username = req.body.username;
  userInfo.password = req.body.password;

  var user = new User(userInfo);
  console.log('did i manage to create a user?', user);
  user.save(function(err){
  	if (err){
  		console.log('failed to create new user');
  		//eventually should be a redirect here
  		res.status(404);
  	}
  	//should eventually create a session
  	//and redirect
  	res.status(201).send(user);
  })
}

exports.signIn = function(req, res) {
  var userInfo = {};
  user.username = req.body.username;
  user.password = req.body.password;

  User.findOne(userInfo), fuction(err, user){
  	if (err || !user){
  		console.log('failed to find user');
  		//probably should redirect or something here
  		res.status(404);
  	}
  	//should create session and perhaps redirect here
  	res.status(200).send(user);
  }
}