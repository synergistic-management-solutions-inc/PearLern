var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')

const RaisedButton = require('material-ui/lib/raised-button');

var mountNode = document.getElementById('app');

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
      matchFail: ''
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
      data: newUser
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
  validatePassword: function (event) {
    this.setState({
      validate: event.target.value.substr(0, 30)
    });
    if (this.state.valdiate !== this.state.password) {
      this.setState({
        matchFail: 'Passwords do not match!'
      });
    }
  },
  render: function () {
    return (
      <div className="container" className="sign-up">
        <div className="row">
          <div className="col s6 offset-s6">
            <h4 className="signup-header">Sign Up</h4> 
            <input type="text" className="username-input" placeholder="Choose a Username" onChange={this.updateUsername}/> <br />
            <input type="password" className="password-input" placeholder="Choose a Password"  onChange={this.updatePassword}/>
            <input type="password" className="password-validate" placeholder="Re-enter Password"  onChange={this.validatePassword}/>
            <p className="validate-text">{this.state.matchFail}</p>
            <RaisedButton label="Register" className="submit-button" onClick={this.addUser}/> 
            <p className="signup-footer">Already registered? <a href='/signin'>Sign-In </a></p>
          </div>
        </div>
      </div>
    )
  }
});

//ReactDOM.render(<SignUp />, mountNode);

module.exports = SignUp;
