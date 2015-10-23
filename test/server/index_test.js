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

  it("users can sign up and sign in", function(){
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

  it('users cannot sign in before signing up', function(){
    return request(app)
    .post('/signin')
    .send(user)
    .expect(404)
  })

  it('users cannot sign up twice', function(){
    return signUp(function(){
      return request(app)
      .post('/signup')
      .send(user)
      .expect(400)
    })
  })


  it('user has a profile', function(){
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
    })
  })

  it('user can change profile information', function(){
    return signUp(function(){
      return request(app)
      .post('users/user')
      .send(profile)
      .expect(201)
      .then(function(){
        return request(app)
        .post('users/user')
        .send({email: '', about: '', interests: ''})
        .expect(201)
        .expect(function(res){
          var newProfile = res.body
          expect(newProfile.email).to.equal('')
          expect(newProfile.about).to.equal('')
          expect(newProfile.interests).to.equal('')
        })
      })
    })
  })
})
