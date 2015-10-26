var React = require('react');
var ReactDOM = require('react-dom');
var Profile = require('./views/profile.jsx');
var SignUp = require('./views/signup.jsx');
var SignIn = require('./views/signin.jsx');
var Landing = require('./views/landing.jsx');
var AllUsers = require('./views/otherUsers.jsx');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var $ = require('jquery');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Landing />
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="signin" component={SignIn} />
      <Route path="signup" component={SignUp} />
      <Route path="profile" component={Profile} />
      <Route path="all" component={AllUsers} />
    </Route>
  </Router>
),

document.getElementById('app'));