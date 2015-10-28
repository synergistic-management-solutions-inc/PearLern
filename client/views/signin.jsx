var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var Link = require('react-router').Link

var SignInHead = require('./landinghead2.jsx')
const RaisedButton = require('material-ui/lib/raised-button');

//TODOs: 
//Add form validation
//Add novaldiate to forms to override default HTML 5 validation?
//Server response

var SignIn = React.createClass({
  getInitialState: function (){
    return {
      username: '',
      password: ''
    }
  },
  validateUser: function () {
    //Composes new user instance from current username/password state & posts to server
    var User = {
      username: this.state.username,
      password: this.state.password
    } 
    $.ajax({
      type: 'POST',
      url: '/signin',
      data: User
    })
    .then(function (err,res){
      if (err) {
        console.log(err)
      } //send 20? on success?
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
      <div className="sign-in-view">
        <div className="row">
          <div className="col s6">
            <img className="responsive-img" src=" "/>
          </div>
          <div className="col s6">
            <h4 className="signin-header">Sign In</h4> 
            <input type="text" className="username-input" placeholder="Enter Username" onChange={this.updateUsername}/>
            <input type="password" className="password-input" placeholder="Enter Password"  onChange={this.updatePassword}/> 
            <RaisedButton label="Sign In" className="submit-button" onClick={this.validateUser}/>
            <p className="signin-footer">Not yet registered? <Link to='/signup'>Sign up!</Link></p>
          </div>
        </div>
        <SignInHead />
        <div className="push"></div>
      </div>
    )
  }
});

module.exports = SignIn;
