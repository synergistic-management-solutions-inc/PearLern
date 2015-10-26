var request = require('supertest-as-promised')
var routes = require(__server + '/index.js')
var User = require(__server + '/database/models/user');

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  var user = {'username': 'user','password': 'pass'}
  var profile = {'email': 'email@email.com', 'about': 'I don\'t actually exist', 'interests': ['backbone']}

  beforeEach(function() {
    return User.remove({});
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

  var signUp = function(cb){
    return request(app)
      .post('/signup')
      .send(user)
      .expect(201)
      .then(cb)
  }

  it("creates new accepts sign up and sign in requests", function(){
    return request(app)
      .post('/signup')
      .send(user)
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
          .send(user)
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
    .send(user)
    .expect(404)
  })

  it('will not allow a user to sign up twice', function(){
    return signUp(function(){
      return request(app)
      .post('/signup')
      .send(user)
      .expect(400)
    })
  })

  var newProfile = function(cb){
    return signUp(function(){
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
    return signUp(function(){
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
    return signUp(function(){
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
    return signUp(function(){
      return request(app)
      .get('/users')
      .expect(200)
      .expect(function(res){
        expect(res.body.users.length).to.equal(0);
      })
    })
  })
})
