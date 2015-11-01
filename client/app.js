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
var Messenger = require('./views/messenger.jsx');
var Footer = require('./views/footer.jsx');

/*
There's some unforunate hacky stuff going on here.

Specifically: 
  - 'state.messageTo' should only be passed to the Messenger component   
  - 'login' should only be passed to the SignUp and SignIn components
  - 'message' should only be passed to the AllUsers component

Doing that seems like it should be quite straight forward. Ran out of time 
to figure it out. So instead I passed all of them to every single child 
component. That's what's happening in the cloneElement line.   
*/

var App = React.createClass({
  getInitialState: function(){
    return {
      currentUser: null,
      messageTo: null
    }
  },
  login: function(username){ 
    this.setState({currentUser: username})
  },
  message: function(username){
    this.setState({messageTo: username})
  },
  render: function() {
    console.log(React.Children.toArray(this.props.children));
    return (
      <div className="container">
        <Nav currentUser={this.state.currentUser}/>
        {React.cloneElement(this.props.children, {
            currentUser: this.state.currentUser,
            messageTo: this.state.messageTo,
            login: this.login,
            message: this.message
          })}
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
      <Route path="messenger" component={Messenger} />
    </Route>
  </Router>
),

document.getElementById('app'));
