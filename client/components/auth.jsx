var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');
var SignInContent = require('../views/landinghead2.jsx');
var Link = require('react-router').Link;
var authActions = require('../actions/authActions');
var authStore = require('../stores/authStore');



// var React = require('react');
// var $ = require('jquery');
// var Link = require('react-router').Link;
// var SignInContent = require('./landinghead2.jsx');
// const RaisedButton = require('material-ui/lib/raised-button');


var Auth = React.createClass({
  getInitialState: function (){
    return {
      username: '',
      password: ''
    };
  },
  render: function () {
    return (
      <div className="sign-in-view">
        <div className="row">
          <div className="col s6">
            <img className="responsive-img" src="https://zenpayroll.com/wp-content/uploads/2013/10/pair-programming.jpg"/>
          </div>
          <div className="col s6">
            <h4 className="signin-header">Sign In</h4> 
            <input type="text" className="username-input" placeholder="Enter Username" onChange={authActions.updateUsername}/>
            <input type="password" className="password-input" placeholder="Enter Password"  onChange={authActions.updatePassword}/> 
            <RaisedButton label="Sign In" className="submit-button" onClick={authActions.validateUser}/>
            <p className="signin-footer">Not yet registered? <Link to='/signup'>Sign up!</Link></p>
          </div>
        </div>
        <SignInContent />
        <div className="push"></div>
      </div>
    )
  }
});

module.exports = Auth;