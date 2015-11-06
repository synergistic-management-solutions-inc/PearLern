window.Peer = require('peerjs');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var $ = require('jquery');
var createBrowserHistory = require('history/lib/createBrowserHistory');

// ----------------REACT VIEWS----------------
var Profile = require('./views/profile.jsx');
var SignUp = require('./views/signup.jsx');
var SignIn = require('./views/signin.jsx');
var Landing = require('./views/landing.jsx');
var Nav = require('./views/nav.jsx');
var AllUsers = require('./views/otherUsers.jsx');
var Messenger = require('./views/messenger.jsx');
var Footer = require('./views/footer.jsx');
var UserView = require('./components/newotherUsers.jsx');
var AuthView = require('./components/auth.jsx');

/*
There's some unforunate hacky stuff going on here.
Specifically:
  - 'state.messageTo' should only be passed to the Messenger component
  - 'storeUser' and 'history' should only be passed to the SignUp and SignIn components
  - 'message' should only be passed to the AllUsers component
Doing that seems like it should be quite straight forward. Ran out of time
to figure it out. So instead I passed all of them to every single child
component. That's what's happening in the cloneElement line.
*/

var App = React.createClass({
  getInitialState: function(){
    var currUser = window.localStorage.getItem('theUser');
    var messTo = window.localStorage.getItem('messageTo');
    return {
      currentUser: currUser || null,
      messageTo: messTo || null
    };
  },
  storeUser: function(username){
    this.setState({currentUser: username}, function() {
      window.localStorage.setItem('theUser', username);
    });
  },
  message: function(username){
    this.setState({messageTo: username}, function() {
      window.localStorage.setItem('messageTo', username);
    });
  },
  render: function() {
    return (
      <div className="container">
        <Nav currentUser={this.state.currentUser}
            storeUser={this.storeUser}/>
        {React.cloneElement(this.props.children, {
            currentUser: this.state.currentUser,
            messageTo: this.state.messageTo,
            storeUser: this.storeUser,
            message: this.message,
            history: this.props.history
          })}
        <Footer />
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      {/* <IndexRoute component={Landing} />*/}
      <IndexRoute component={Messenger} />
      <Route path="signin" component={SignIn} />
      <Route path="signup" component={SignUp} />
      <Route path="profile" component={Profile} />
      <Route path="all" component={AllUsers} />
      <Route path="messenger" component={Messenger} />
      <Route path="newAll" component={UserView} />
    </Route>
  </Router>
),

document.getElementById('app'));
