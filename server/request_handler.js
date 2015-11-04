var User = require('./database/models/user');
var Message = require('./database/models/message');
var _ = require('underscore');

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
        name: profile.name || '',
        about: profile.about || '',
        interests: profile.interests || ''
      });
    });
    res.status(200).send({'users': userData});
  });
};

//retrieves the profile information for the current user
exports.getProfile = function(req, res){
  var userId = req.session.passport.user;

  User.findOne({_id: userId}, function(err, user){
    if (err || !user){
      console.log('user does not exist');
      res.status(404).send(err);
      return;
    }
    // console.log(user);
    res.status(200).send(user.profile);
  });
};

//creates a new user in the DB
exports.signUp = function(req, res) {
  var userInfo = {};
  userInfo.username = req.body.username;
  userInfo.password = req.body.password;

  //profile fields are intially set to empty strings.
  userInfo.profile = {name: '', about: ''};
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
  });
};

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
  });
};

//overwrites current profile information
//will overwrite all three fields (name, about, interests)
exports.submitProfile = function(req, res){
  //grabs the username from request URL
  // var username = req.path.substring(7);
  var userId = req.session.passport.user;

  var profileInfo = {};
  profileInfo.name = req.body.name;
  profileInfo.about = req.body.about;
  profileInfo.interests = req.body.interests;

  User.findOne({_id: userId}, function(err, user){
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
    });
  });
};

exports.sendMessage = function(req, res){
  var messageInfo = {};
  messageInfo.to = req.body.to;
  messageInfo.from = req.body.from;
  messageInfo.text = req.body.text;

  // console.log('messageInfo to', messageInfo.to);
  // console.log('messageInfo from', messageInfo.from);
  // console.log('messageInfo text', messageInfo.text);
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
    // console.log('recipient', recipient);

    //creates and saves the message
    var message = new Message(messageInfo);
    message.save(function(err){
      if (err){
        console.log('message could not be sent');
        res.status(400).send(err);
        return;
      }
      // console.log('message saved 143', message);
      res.status(201).send(message);
    });
  });
};

//finds all messages from a particular user and sorts them by conversation
//the shape of the data here is a bit convoluted and I apologize for that,
//but it makes life really easy on the client side in messenger.jsx
//see README for a more precise description of what the server is sending
exports.getMessages = function(req, res){
  //grabs username from URL
  // var username = req.path.substring(10);
  var userId = req.session.passport.user;
  var allMessages = {};

  User.findOne({_id: userId}, function(err, user){
    if (err || !user){
      console.log('user does not exist');
      res.status(404).send(err);
      return;
    }

    //TODO -- Done
    //verify that this user is who they say they are
    //via sessions or something

    Message.find({'to': user.username}, function(err, receivedMessages){
      if (err){
        console.log('could not find messages');
        res.status(404).send(err);
        return;
      }

      if (Array.isArray(receivedMessages)) {
        receivedMessages.forEach(function(message){
          var from = message.from;

          if (!allMessages[from]){
            allMessages[from] = [];
          }

          allMessages[from].push(message);
        });
      }

      Message.find({'from': user.username}, function(err, sentMessages){
        if (err){
          console.log('could not find messages');
          res.status(404).send(err);
          return;
        }

        sentMessages.forEach(function(message){
          var to = message.to;

          if (!allMessages[to]){
            allMessages[to] = [];
          }

          allMessages[to].push(message);
        });

        // Sort the messages
        // By created_at timestamp
        // Using underscore
        _.each(allMessages, function(messages, user) {
          allMessages[user] = _.sortBy(messages, 'created_at');
        });

        var conversations = [];

        //restructures data
        //this shape will be more useful
        //to work with React
        _.each(allMessages, function(messages, user){
          var conversation = {
            username: user,
            messages: messages
          };
          conversations.push(conversation);
        });

        res.status(200).send({conversations: conversations});
      });
    });
  });
};
