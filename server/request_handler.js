var User = require('./database/models/user');
var Message = require('./database/models/message');
var _ = require('underscore');
var prettyjson = require('prettyjson');

//retrieves user/profile information for all users
exports.getUsers = function(req, res){
  User.find({}, function(err, users){
    var userData = [];
    users.forEach(function(user){
      var profile = user.profile;

      //the client must check
      //if these users have profiles
      //I'll send empty strings
      userData.push({
        username: user.username,
        email: profile.email || '',
        about: profile.about || '',
        interests: profile.interests || ''
      })
    })
    res.status(200).send({'users': userData});
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
  profileInfo.email = req.body.email;
  profileInfo.about = req.body.about;
  profileInfo.interests = req.body.interests;

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

exports.sendMessage = function(req, res){
  var messageInfo = {};
  messageInfo.to = req.body.to;
  messageInfo.from = req.body.from;
  messageInfo.text = req.body.text;
  
  //TODO
  //verify that the sender exists
  //and has a session to prove who they are

  //checks that the recipient exists
  User.findOne({username: messageInfo.to}, function(err, recipient){
    if (err || !recipient){
      console.log('cannot message nonexistent user');
      res.status(404).send(err);
      return;
    }

    //creates and saves the message
    var message = new Message(messageInfo);
    message.save(function(err){
      if (err){
        console.log('message could not be sent');
        res.status(400).send(err);
        return;
      }
      res.status(201).send(message);
    })
  })
}

exports.getMessages = function(req, res){
  //grabs username from URL
  var username = req.path.substring(10);

  //TODO 
  //verify that this user exists 
  //and that they are who they say they are

  Message.find({'to': username}, function(err, receivedMessages){
    if (err){
      console.log('could not find messages');
      res.status(404).send(err);
      return;
    }

    Message.find({'from': username}, function(err, sentMessages){

      // Build convo data
      // buildConversation function
      // Organizes data
      var conversations = [];

      function buildConversation(messages) {
        var convObj = {user : ''}
        convObj.messages = [];
        _.each(messages, function(message) {
          convObj.username = message.from
          convObj.messages.push({
            to : message.to,
            from : message.from,
            text : message.text,
            created_at : message.created_at
          })
        })
          conversations.push(convObj);
      }

      buildConversation(sentMessages);
      buildConversation(receivedMessages);

      // Sort the messages
      // By created_at timestamp
      // Using underscore
      conversations.forEach(function(convo) {
         convo.messages = _.sortBy(convo.messages, 'created_at')
      })
      // Run this to see the conversations:
      // console.log('conversations', prettyjson.render(conversations));

      res.status(200).send(conversations);
    })
  })
}