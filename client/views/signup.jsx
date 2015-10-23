var React = require('react')
var ReactDOM = require('react-dom');

//TODOs:
//Compose new user instance
//Add routing to send out data
//Add form validation
//consider adding novaldiate to forms to override default HTML 5 validation

var SignUpContainer = React.createClass({
  getInitialState: function (){
    return {
      username: '',
      password: ''
    }
  },
  AddUser: function () {
    //Composes new user instance from current username/password state
    //var newUser = {};
    //newUser.username = {this.state.username}
    //newUser.password = {this.state.password}
    //POST request goes here
  },
  AddUsername: function (username) {
    //Property called by children to update state of parent
    this.setState({
      username: username
    });
  },
  AddPassword: function (password) {
    //Property called by children to update state of parent
    this.setState({
      password: password
    });
  },
  render: function () {
    //do we want the addNew property on the form element?  Or elsewhere?
    //not sure if enctype is correct or if we even want any of this default behavior in here
    //Maps addNewUser/addNewUsername/addNewPassword properties to local methods
    return (
      <div className="signup-container">
        <h2 className="signup-header">Sign Up and Prepare to Get Schooled</h2>
        <form enctype="multipart/form-data" method="POST" action="/signup" addNewUser={this.AddUser} addNewPassword={this.AddPassword} addNewUsername={this.AddUsername}> 
          <UsernameInput />
          <PasswordInput />
          <SubmitButton />
        </form>
        <SignUpFooter />
      </div>
    )
  }
});

//--------------------STATEFUL CHILD COMPONENTS---------------------

var UsernameInput = React.createClass({
  getInitialState: function () {
    return {
      username: ''
    }
  },
  updateUsername: function (event){
    //60 character limit for username
    this.setState({
      username: event.target.value.substr(0, 60)
    });
  },
  handleAddUsername: function () {
    //Passes down AddNewUsername method from parent via prop; child calls this to update parent's state
    this.props.AddNewUsername(this.state.username)
  },
  render: function () {
    return (
      <input type="text" className="username-input" placeholder="Choose a Username" onChange={this.updateUsername}/>
    )
  }
});

var PasswordInput = React.createClass({
  getInitialState: function () {
    return {
      password: ''
    }
  },
  updatePassword: function (event) {
    //30 character limit for password
    this.setState({
      password: event.target.value.substr(0, 30)
    })
  },
  handleAddPassword: function () {
    //Passes down AddUser method from parent via prop; child calls this to update parent's state
    this.props.AddNewPassword(this.state.password)
  },
  render: function () {
    return (
     <input type="text" className="password-input" placeholder="Choose a Password"  onChange={this.updatePassword}/> 
    )
  }
});

//--------------------STATELESS (DUMB) CHILD COMPONENTS---------------------
var SubmitButton = React.createClass({
  submitUser: function () {
    this.props.AddNewUser();
  },
  render: function () {
    return (
      <button type="submit" className="submit-button" onClick={this.submitUser}> Register </button>
    )
  }
});

var SignUpFooter = React.createClass({
  render: function () {
    return (
      <p className="signup-footer">Already registered? <a href='/signin'>Sign-In </a></p>
    )
  }
});


module.exports = SignUpContainer;