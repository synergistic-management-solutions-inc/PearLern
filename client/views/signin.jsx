var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
const RaisedButton = require('material-ui/lib/raised-button');

var mountNode = document.getElementById('app')

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
      <div className="signin-container">
        <h2 className="signin-header">Sign Up and Prepare to Get Schooled</h2> 
        <input type="text" className="username-input" placeholder="Choose a Username" onChange={this.updateUsername}/>
        <input type="password" className="password-input" placeholder="Choose a Password"  onChange={this.updatePassword}/> 
        <RaisedButton label="Sign In" className="submit-button" onClick={this.validateUser}/>
        <p className="signin-footer">Already registered? <a href='/signin'>Sign-In </a></p>
      </div>
    )
  }
});

//ReactDOM.render(<SignIn />, mountNode);

module.exports = SignIn;
