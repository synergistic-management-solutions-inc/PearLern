var React = require('react');
var ReactDOM = require('react-dom');
var Profile = require('./views/profile.jsx');
var SignUp = require('./views/signup.jsx');
var SignIn = require('./views/signin.jsx');
var Landing = require('./views/landing.jsx');
var LandingHead = require('./views/landinghead.jsx')
var AllUsers = require('./views/otherUsers.jsx');
var Footer = require('./views/footer.jsx');
var $ = require('jquery');

ReactDOM.render(<div className="container">
                  <Landing />
                  <LandingHead />
                  <SignUp />
                  <Profile users={Profile.USERS} />
                  <AllUsers />
                  <Footer />
                </div>,
                  document.getElementById('app')
                );
