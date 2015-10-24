var request = require('supertest-as-promised')
var routes = require(__server + '/index.js')
var User = require(__server + '/database/models/user');

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  var user = {'username': 'user','password': 'pass'}
  var profile = {'email': 'email@email.com', 'about': 'I don\'t actually exist', 'interests': 'backbone'}

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
      .send({username: 'user', profile: profile})
      .expect(201)
      .expect(function(res){
        var newProfile = res.body
        expect(newProfile.email).to.equal(profile.email)
        expect(newProfile.about).to.equal(profile.about)
        expect(newProfile.interests).to.equal(profile.interests)
      })
    }).then(cb)
  }

  it('accepts profile information', function(){
    return newProfile(function(){})
  })

  it('accepts changes to preexisting profiles', function(){
    return newProfile(function(){
      return request(app)
      .post('/users/user')
      .send({username: 'user', profile: {email: '', about: '', interests: ''}})
      .expect(201)
      .expect(function(res){
        var newProfile = res.body
        expect(newProfile.email).to.equal('')
        expect(newProfile.about).to.equal('')
        expect(newProfile.interests).to.equal('')
      })
    })
  })

  // it('retrieves user data', function(){
  //   return newProfile(function(){
  //     return request(app)
  //     .get('/users')
      
  //   })
  // })
})
