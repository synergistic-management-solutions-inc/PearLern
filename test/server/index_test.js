var request = require('supertest')
var routes = require(__server + '/index.js')

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it("serves an example endpoint", function() {

    // Mocha will wait for returned promises to complete
    return request(app)
      .get('/api/tags-example')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.include('node')
      })
  })

  var user = {
    'username': 'user',
    'password': 'pass'
  }

  it("replies to post requests from /signup", function(){
    return request(app)
      .post('/signup')
      .send(user)
      .expect(201)
      .expect(function(res){
        var newUser = res.body
        expect(newUser.id).to.not.be.undefined
        expect(newUser.username).to.equal('user')
        expect(newUser.password).to.equal('pass')
      })
    })

  it("replies to post requests from /signin", function(){
    return request(app)
      .post('/signin')
      .send(user)
      .expect(200)
      .expect(function(res){
        var newUser = res.body
        expect(newUser.id).to.not.be.undefined
        expect(newUser.username).to.equal('user')
        expect(newUser.password).to.equal('pass')
      })
    })



})
