  var request = require('supertest-as-promised');
  var routes = require(__server + '/index');
  var User = require(__server + '/database/models/user');
  var Message = require(__server + '/database/models/message');
  var prettyjson = require('prettyjson');

  describe("The Server", function() {

    var app = TestHelper.createApp()
    app.use('/', routes)
    app.testReady()

    //sample data for testing
    var users = [
      {'username': 'user','password': 'pass'},
      {'username': 'shady_joe', 'password': 'asdf' },
      {'username': 'helen_of_troy', 'password': '1234'},
      {'username': 'wizard_of_sound', 'password': 'wizard!'}
    ]
    var profile = {'name': 'User McUsersen', 'about': 'I don\'t actually exist', 'interests': ['backbone']};
    var messages = [
      {'to': 'shady_joe', 'from': 'user', 'text': 'yo man, u got the goods?'},
      {'to': 'user', 'from': 'shady_joe', 'text': 'yeah, meet me down by the docks'},
      {'to': 'user', 'from': 'helen_of_troy', 'text': 'hey does shady joe have the stuff?'},
      {'to': 'shady_joe', 'from': 'user', 'text': 'i\'ll be there'}
    ]

    /* These are helper functions for the tests.
    I know there are much more sophisticated ways to do this
    involving promises and before eachs and all that, but oh well
    */

    var signUp = function(user, cb){
      return request(app)
        .post('/signup')
        .send(user)
        .expect(201)
        .then(cb)
    }

    //signs up 'user' and creates a profile
    var newProfile = function(cb){
      return signUp(users[0], function(){
        return request(app)
        .post('/users/user')
        .send(profile)
        .expect(201)
        .expect(function(res){
          var newProfile = res.body
          expect(newProfile.name).to.equal(profile.name)
          expect(newProfile.about).to.equal(profile.about)
          expect(newProfile.interests[0]).to.equal(profile.interests[0])
        })
      }).then(cb)
    }

    //be sure to sign up both users involved in the message
    //before calling this
    var sendMessage = function(message, cb){
      return request(app)
      .post('/messages')
      .send(message)
      .expect(201)
      .then(cb)
    }

  //clears the DB
    beforeEach(function() {
      return User.remove({});
    })

    beforeEach(function(){
      return Message.remove({})
    })

    it("serves an example endpoint", function() {

      // Mocha will wait for returned promises to complete
      return request(app)
        .get('/api/tags-example')
        .expect(200)
        .expect(function(response) {
          expect(response.body).to.include('node')
        })
    })


    it("creates new accepts sign up and sign in requests", function(){
      return request(app)
        .post('/signup')
        .send(users[0])
        .expect(201)
        .expect(function(res){
          var newUser = res.body

          expect(newUser._id).to.not.be.undefined
          expect(newUser.username).to.equal('user')
          expect(newUser.password).to.equal('pass')
        })
        .then(function(){
          return request(app)
            .post('/signin')
            .send(users[0])
            .expect(200)
            .expect(function(res){
              var newUser = res.body
              expect(newUser._id).to.not.be.undefined
              expect(newUser.username).to.equal('user')
              expect(newUser.password).to.equal('pass')
            })
        })
      })

    it('it will not sign in a nonexistant user', function(){
      return request(app)
      .post('/signin')
      .send(users[0])
      .expect(404)
    })

    it('will not allow a user to sign up twice', function(){
      return signUp(users[0], function(){
        return request(app)
        .post('/signup')
        .send(users[0])
        .expect(400)
      })
    })


    it('accepts profile information', function(){
      return newProfile(function(){})
    })

    it('allows a user to have multiple interests', function(){
      return signUp(users[0], function(){
        return request(app)
        .post('/users/user')
        .send({name: '', about: '', interests: ['backbone', 'MORE backbone']})
        .expect(201)
        .expect(function(res){
          var interests = res.body.interests
          expect(interests[0]).to.equal('backbone');
          expect(interests[1]).to.equal('MORE backbone');
        })
      })
    })

  it('accepts changes to preexisting profiles', function(){
    return newProfile(function(){
      return request(app)
      .post('/users/user')
      .send({name: '', about: '', interests: []})
      .expect(201)
      .expect(function(res){
        var newProfile = res.body
        expect(newProfile.name).to.equal('')
        expect(newProfile.about).to.equal('')
        expect(newProfile.interests.length).to.equal(0)
      })
    })
  })

  it('returns 404 to post requests for a nonexistent user', function(){
    return newProfile(function(){
      return request(app)
      .post('/users/consuelo')
      .send({name: '', about: '', interests: ''})
      .expect(404)
    })
  })

  it('returns 404 to get requests for a nonexistent user',function(){
    return newProfile(function(){
      return request(app)
      .get('/users/consuelo')
      .expect(404)
    })
  })

  it('returns a single user\'s profile information', function(){
    return newProfile(function(){
      return request(app)
      .get('/users/user')
      .expect(200)
      .expect(function(res){
        expect(res.body.interests[0]).to.equal('backbone')
      })
    })
  })

  it('returns empty strings is the user has not entered profile info', function(){
    return signUp(users[0], function(){
      return request(app)
      .get('/users/user')
      .expect(200)
      .expect(function(res){
        expect(res.body.name).to.equal('')
        expect(res.body.about).to.equal('')
        expect(res.body.interests.length).to.equal(0)
      })
    })
  })

  it('retrieves data for all users', function(){
    return newProfile(function(){
      return request(app)
      .get('/users')
      .expect(200)
      .expect(function(res){
        expect(res.body.users.length).to.equal(1)
        expect(res.body.users[0].username).to.equal('user')
        expect(res.body.users[0].interests[0]).to.equal('backbone')
      })
    })
  })

  it('allows users to send messages', function(){
    return signUp(users[0], function(){
      return signUp(users[1], function(){
        return request(app)
        .post('/messages')
        .send(messages[0])
        .expect(201)
        .expect(function(res){
          expect(res.body._id).to.not.be.undefined
          expect(res.body.text).to.equal(messages[0].text)
          expect(res.body.created_at).to.not.be.undefined
        })
      })
    })
  })

  it('will not send a message to a nonexistent user', function(){
    return signUp(users[0], function(){
      return request(app)
      .post('/messages')
      .send(messages[0])
      .expect(404)
    })
  })


/* !!YE BE WARNED!!
  You are now entering into the chasm of callbacks,
  where Scott was once pinned under an anonymous function 
  for three days and almost had to cut off his own arm
  to escape
*/

  it('will retrieve all messages for a particular user', function(){
    return signUp(users[0], function(){
      return signUp(users[1], function(){
        return sendMessage(messages[0], function(){
          return sendMessage(messages[1], function(){
            return request(app)
            .get('/messages/user')
            .expect(200)
            .expect(function(res){
              var conversations = res.body.conversations;
              expect(conversations.length).to.equal(1);
              expect(conversations[0].username).to.equal('shady_joe');
              expect(conversations[0].messages.length).to.equal(2);
            })
          })
        })
      })
    })
  })

  it('will not retrieve messages from other users', function(){
    return signUp(users[0], function(){
      return signUp(users[1], function(){
        return signUp(users[2], function(){
          return sendMessage(messages[2], function(){
            return request(app)
            .get('/messages/shady_joe')
            .expect(200)
            .expect(function(res){
              expect(res.body.conversations.length).to.equal(0);
            })
          })
        })
      })
    })
  })

  it('will not retrieve messages for a nonexistent user', function(){
    return request(app)
    .get('/messages/consuelo')
    .expect(404)
  })

  it('orders messages by timpestamp', function(){
    return signUp(users[0], function(){
      return signUp(users[1], function(){
        return sendMessage(messages[0], function(){
          return sendMessage(messages[1], function(){
            return sendMessage(messages[3], function(){
              return request(app)
              .get('/messages/shady_joe')
              .expect(200)
              .expect(function(res){
                var storedMessages = res.body.conversations[0].messages;
                expect(storedMessages[0].text).to.equal(messages[0].text);
                expect(storedMessages[1].text).to.equal(messages[1].text);
                expect(storedMessages[2].text).to.equal(messages[3].text);
              })
            })
          })
        })
      })
    })
  })

  it('not a test, merely populates DB', function(){
    return signUp(users[0], function(){
      return signUp(users[1], function(){
        return signUp(users[2], function(){
          return signUp(users[3], function(){
            return sendMessage(messages[0], function(){
              return sendMessage(messages[1], function(){
                return sendMessage(messages[2], function(){
                  return sendMessage(messages[3], function(){
                  })
                })
              })
            })
          })
        })
      })
    })
  })

})

