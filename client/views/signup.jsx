var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

const RaisedButton = require('material-ui/lib/raised-button');

//TODOs: 
//Add form validation
//Server response codes
//Warning when passwords do not match

//Sign-up component takes in user input on sign-up & posts to server
//Page view comprises left-aligned image & right-aligned input box.
var SignUp = React.createClass({
  getInitialState: function (){
    return {
      username: '',
      password: '',
      validate: ''
    };
  },
  addUser: function () {
    var storeUser = this.props.storeUser;
    var username = this.state.username;
    var password = this.state.password;
    var history = this.props.history;

    //Composes new user instance from current username/password state & posts to server
    var newUser = {
      username: this.state.username,
      password: this.state.password
    };

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: newUser
    }).then(function (res){
       //TODO: check that the user is validated

      //sets the app state currentUser
      // storeUser(username);

      //redirects to profile page 
      history.pushState(null, '/signin');
    });
  },
  updateUsername: function (event) {
    this.setState({
      username: event.target.value.substr(0, 30)
    });
  },
  updatePassword: function (event) {
    this.setState({
      password: event.target.value.substr(0, 30)
    });
  },
  render: function () {
    return (
      
      <div className="sign-up-view">
      <div className="push"></div>
        <div className="row">
          <div className="input-field col s4 offset-s4 z-depth-5">
            <h5 className="signin-header">Sign Up</h5>
            <input type="text" className="username-input" placeholder="Enter Username" onChange={this.updateUsername}/>
            <input type="password" className="password-input" placeholder="Enter Password"  onChange={this.updatePassword}/> 
            <input type="password" className="password-validate" placeholder="Re-enter Password"  onChange={this.validatePassword}/>
            <RaisedButton fullWidth ={true} label="Sign up" className="submit-button" onClick={this.addUser}/>
            <p className="signup-footer">Already registered? <Link to='/signin'>Sign in!</Link></p>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = SignUp;
