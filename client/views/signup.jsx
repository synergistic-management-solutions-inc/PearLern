var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var mountNode = document.getElementById('app');

//TODOs: 
//Hide user password
//Add form validation
//Add novaldiate to forms to override default HTML 5 validation?

var SignUp = React.createClass({
  getInitialState: function (){
    return {
      username: '',
      password: ''
    }
  },
  addUser: function () {
    //Composes new user instance from current username/password state & posts to server
    var newUser = {
      username: this.state.username,
      password: this.state.password
    } 
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
  render: function () {
    return (
      <div className="signup-container">
        <h2 className="signup-header">Sign Up and Prepare to Get Schooled</h2> 
        <input type="text" className="username-input" placeholder="Choose a Username" onChange={this.updateUsername}/>
        <input type="text" className="password-input" placeholder="Choose a Password"  onChange={this.updatePassword}/> 
        <button type="submit" className="submit-button" onClick={this.addUser}> Register </button>
        <p className="signup-footer">Already registered? <a href='/signin'>Sign-In </a></p>
      </div>
    )
  }
});

ReactDOM.render(<SignUp />, mountNode);

module.exports = SignUp;
