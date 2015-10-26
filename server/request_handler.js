var User = require('./database/models/user');

//retrieves profile information for all users who 
//have filled out their email and interests fields
exports.getUsers = function(req, res){
  User.find({}, function(err, users){
    var userData = [];

    users.forEach(function(user){
      var profile = user.profile;

      //profiles with content
      //we only want those users
      //they should be sent here
      if (profile.interests && profile.email){
        userData.push({
          username: user.username,
          email: profile.email,
          about: profile.about,
          interests: profile.interests //in the future, this will be perhaps be sent back as an array
        })
      }
    })
  res.status(200).send({'users': userData})
  })
}

//retrieves the profile information for the current user
exports.getProfile = function(req, res){
  //username is grabbed from request URL
  var username = req.path.substring(7);

  User.findOne({username: username}, function(err, user){
    if (err || !user){
      console.log('user does not exist');
      res.status(404).send(err);
      return;
    }
    res.status(200).send(user.profile);
  })
}

//creates a new user in the DB
exports.signUp = function(req, res) {
  var userInfo = {};
  userInfo.username = req.body.username;
  userInfo.password = req.body.password;

  //profile fields are intially set to empty strings.
  userInfo.profile = {email: '', about: ''}

  var user = new User(userInfo);
  user.save(function(err){
    if (err){
      console.log('failed to create new user');
      //eventually should be a redirect here
      res.status(400).send(err);
      return; 
    }
    //eventually 
    //should redirect to main
    //create a session
    res.status(201).send(user);
  })
}

//checks that user exists in DB and verifies password
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

//overwrites current profile information
//will overwrite all three fields (email, about, interests) 
exports.submitProfile = function(req, res){
  //grabs the username from request URL
  var username = req.path.substring(7);

  var profileInfo = {}; 
  profileInfo.email = req.body.profile.email;
  profileInfo.about = req.body.profile.about;
  profileInfo.interests = req.body.profile.interests;

  User.findOne({username: username}, function(err, user){
    if (err || !user){
      console.log('user does not exist');
      res.status(404).send(err);
      return; 
    }
    user.profile = profileInfo;
    user.save(function(err){
      if (err){
        console.log('profile was not updated');
        res.status(400).send(err);
        return; 
      }

      res.status(201).send(user.profile);     
    })

  })
}
