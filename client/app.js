var React = require('react');
var ReactDOM = require('react-dom');
var Profile = require('./views/profile.jsx');
var SignUp = require('./views/signup.jsx');
var SignIn = require('./views/signin.jsx');
var Nav = require('./views/nav.jsx');
var Landing = require('./views/landing.jsx')
var AllUsers = require('./views/otherUsers.jsx');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var IndexRoute = require('react-router').IndexRoute
var $ = require('jquery');
var Footer = require('./views/footer.jsx');

var App = React.createClass({
  render: function() {
  
      return (
        <div className="app">
          <Nav />
          {this.props.children}
          <Footer />
        </div>
      );

}
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="signin" component={SignIn} />
      <Route path="signin" component={Profile} />
      <Route path="signup" component={SignUp} />
      <Route path="profile" component={Profile} />
      <Route path="all" component={AllUsers} />
    </Route>
  </Router>
),

document.getElementById('app'));
