var React = require('react');
var ReactDOM = require('react-dom');
var Profile = require('./views/profile.jsx');
var SignUp = require('./views/signup.jsx');
var SignIn = require('./views/signin.jsx');
var AllUsers = require('./views/otherUsers.jsx');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var $ = require('jquery');

ReactDOM.render((
  <Router>
    <Route path="/" component={SignUp} />
    <Route path="signin" component={SignIn} />
    <Route path="profile" component={Profile} />
    <Route path="all" component={AllUsers} />
  </Router>
),

document.getElementById('app'));