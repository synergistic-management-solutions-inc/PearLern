var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute 
var Link = require('react-router').Link
var $ = require('jquery');

// ----------------REACT VIEWS----------------
var Profile = require('./views/profile.jsx');
var SignUp = require('./views/signup.jsx');
var SignIn = require('./views/signin.jsx');
var Landing = require('./views/landing.jsx');
var Nav = require('./views/nav.jsx')
var AllUsers = require('./views/otherUsers.jsx');
var Footer = require('./views/footer.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div className = "container">
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
      <Route path="signup" component={SignUp} />
      <Route path="profile" component={Profile} />
      <Route path="all" component={AllUsers} />
    </Route>
  </Router>
),

document.getElementById('app'));
