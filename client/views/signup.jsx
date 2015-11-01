var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var Link = require('react-router').Link

// var LandingHead = require('./landinghead.jsx')
const RaisedButton = require('material-ui/lib/raised-button');

//TODOs: 
//Add form validation
//Add novaldiate to forms to override default HTML 5 validation?
//Server response codes

var SignUp = React.createClass({
  getInitialState: function (){
    return {
      username: '',
      password: '',
      validate: '',
      matchFail: false
    }
  },
  addUser: function () {
    //Composes new user instance from current username/password state & posts to server
    var newUser = {
      username: this.state.username,
      password: this.state.password
    } 
    console.log("newUser:", newUser);
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: newUser,
      success : function(res) {
        console.log('response', res)
      },
      error : function(err) {
        console.log(err);
      }
    })
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
  validatePassword: function (event) {
    this.setState({
      validate: event.target.value.substr(0, 30)
    });
    this.state.valdiate !== this.state.password ? this.setState({matchFail: true}) : this.setState({matchFail: false}) 
  },
  render: function () {
    return (
      <div className="sign-up-view">
        <div className="row">
          <div className="col s6">
            <img className="responsive-img" src="http://archsmarter.com/wp-content/uploads/Learn-to-code1.jpg"/>
          </div>
          <div className="col s6">
            <h4 className="signup-header">Sign Up</h4> 
            <input type="text" className="username-input" placeholder="Choose a Username" onChange={this.updateUsername}/> <br />
            <input type="password" className="password-input" placeholder="Choose a Password"  onChange={this.updatePassword}/>
            <input type="password" className="password-validate" placeholder="Re-enter Password"  onChange={this.validatePassword}/>
            {this.state.matchFail ? <p className="validate-text">Passwords do not match!</p> : <br />}
            <RaisedButton label="Register" className="submit-button" onClick={this.addUser}/> 
            <p className="signup-footer">Already registered? <Link to='/signin'>Sign in!</Link></p>
          </div>
        </div>
        <div className="push"></div>
      </div>
    )
  }
});

module.exports = SignUp;
