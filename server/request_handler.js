var User = require('./database/models/user');

exports.signUp = function(req, res) {
  var userInfo = {};
  userInfo.username = req.body.username;
  userInfo.password = req.body.password;

  var user = new User(userInfo);
  user.save(function(err){
  	if (err){
  		console.log('failed to create new user');
  		//eventually should be a redirect here
  		res.status(400).send(err);
  		return; 
  	}
  	//should eventually create a session
  	//and redirect
  	res.status(201).send(user);
  })
}

exports.signIn = function(req, res) {
  var userInfo = {};
  userInfo.username = req.body.username;
  userInfo.password = req.body.password;

  User.findOne(userInfo, function(err, user){
  	if (err || !user){
  		console.log('failed to find user');
  		//probably should redirect or something here
  		res.status(404).send(err);
  		return; 
  	}
  	//should create session and perhaps redirect here
  	res.status(200).send(user);
  })
}

exports.submitProfile = function(req, res){
	console.log('hopefully this is hitting')
	var profileInfo = {} 
	profileInfo.email = req.body.profile.email;
	profileInfo.about = req.body.profile.about;
	profileInfo.interests = req.body.profile.interests;

	User.findOne({username: req.body.username}, function(err, user){
		if (err || !user){
			console.log('cannot enter profile info');
			res.status(404).send(err);
		}
		user.profile = profileInfo;
		user.save(function(err){
			if (err){
				console.log('profile info was not updated');
				res.status(400).send(err);
				return; 
			}

			res.status(201).send(user.profile);			
		})

	})
}
