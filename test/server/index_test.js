  var request = require('supertest-as-promised');
  var routes = require(__server + '/index');
  var User = require(__server + '/database/models/user');
  var Message = require(__server + '/database/models/message');

  describe("The Server", function() {

    var app = TestHelper.createApp()
    app.use('/', routes)
    app.testReady()

    //sample data for testing
    var users = [
      {'username': 'user','password': 'pass'},
      {'username': 'shady_joe', 'password': 'asdf' },
      {'username': 'helen_of_troy', 'password': '1234'}
    ]
    var profile = {'email': 'email@email.com', 'about': 'I don\'t actually exist', 'interests': ['backbone']};
    var messages = [
      {'to': 'shady_joe', 'from': 'user', 'text': 'yo man, u got the goods?'},
      {'to': 'user', 'from': 'shady_joe', 'text': 'yeah, meet me down by the docks'},
      {'to': 'user', 'from': 'helen_of_troy', 'text': 'hey does shady joe have the stuff?'}
    ]

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

    var signUp = function(user, cb){
      return request(app)
        .post('/signup')
        .send(user)
        .expect(201)
        .then(cb)
    }

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

    var newProfile = function(cb){
      return signUp(users[0], function(){
        return request(app)
        .post('/users/user')
        .send(profile)
        .expect(201)
        .expect(function(res){
          var newProfile = res.body
          expect(newProfile.email).to.equal(profile.email)
          expect(newProfile.about).to.equal(profile.about)
          expect(newProfile.interests[0]).to.equal(profile.interests[0])
        })
      }).then(cb)
    }

    it('accepts profile information', function(){
      return newProfile(function(){})
    })

    it('allows a user to have multiple interests', function(){
      return signUp(users[0], function(){
        return request(app)
        .post('/users/user')
        .send({email: '', about: '', interests: ['backbone', 'MORE backbone']})
        .expect(201)
        .expect(function(res){
          var interests = res.body.interests
          expect(interests[0]).to.equal('backbone');
          expect(interests[1]).to.equal('MORE backbone');
        })
      })

  it('accepts changes to preexisting profiles', function(){
    return newProfile(function(){
      return request(app)
      .post('/users/user')
      .send({email: '', about: '', interests: []})
      .expect(201)
      .expect(function(res){
        var newProfile = res.body
        expect(newProfile.email).to.equal('')
        expect(newProfile.about).to.equal('')
        expect(newProfile.interests.length).to.equal(0)
      })
    })
  })

  it('returns 404 to post requests for a nonexistent user', function(){
    return newProfile(function(){
      return request(app)
      .post('/users/consuelo')
      .send({email: '', about: '', interests: ''})
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
        expect(res.body.email).to.equal('')
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

  it('only retrieves users with profile information', function(){
    return signUp(users[0], function(){
      return request(app)
      .get('/users')
      .expect(200)
      .expect(function(res){
        expect(res.body.users.length).to.equal(0);
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

  var sendMessage = function(to, from, message, cb){
    return signUp(to, function(){
      return signUp(from, function(){
        return request(app)
        .post('/messages')
        .send(message)
        .expect(201)
        .then(cb)
      })
    })
  }

  it('will retrieve all messages for a particular user', function(){
    return sendMessage(users[0], users[1], messages[0], function(){
      return request(app)
      .post('/messages')
      .send(messages[1])
      .expect(201)
      .then(function(){
        return request(app)
        .get('/messages/user')
        .expect(200)
        .expect(function(res){
          expect(res.body.messages.length).to.equal(2)
        })
      })
    })
  })

  it('will not retrieve messages from other users', function(){
    return signUp(users[1], function(){
      return sendMessage(users[0], users[2], messages[2], function(){
        return request(app)
        .get('/messages/shady_pete')
        .expect(200)
        .expect(function(res){
          expect(res.body.messages.length).to.equal(0);
        })
      })
    })
  })

})

