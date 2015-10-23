var request = require('supertest-as-promised')
var routes = require(__server + '/index.js')
var User = require(__server + '/database/models/user');

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  var user = {'username': 'user','password': 'pass'}

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
          .send({'username': 'user','password': 'pass'})
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
    return request(app)
    .post('/signup')
    .send(user)
    .expect(201)
    .then(function(){
      return request(app)
      .post('/signup')
      .send(user)
      .expect(400)
    })
  })
})
