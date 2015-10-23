var React = require('react')

var SignUp = React.createClass({
  getInitialState: function(){
    return {
      username: 'Choose a username',
      password: 'Choose a password'
    }
  },
  addUser: function(user) {
    //send user to router to -> server
  },
  render: function(){
    return (
        <div className="container">
          <h2 className="signupHeader">Sign Up and Prepare to Get Schooled</h2>
          <AddUsername addNew={this.addUser}/>
          <AddPassword addNew={this.addUser}/> <br />
          <button onClick={this.addUser}>Register</button>
          <p className="loginRedirect">Already registered? <a href=''>Sign-In </a></p>
        </div>
      )
  }
})

var AddUsername = React.createClass({
  getInitialState: function(){
    return {
      newUser: ''
    }
  },
  updateNewUser: function(event){
    this.setState({
      newUser: event.target.value
    });
  },
  handleAddNew: function(){
    this.props.addNew(this.state.newUser);
    this.setState({
      newUser: ''
    });
  },
  render: function(){
    return (
      <div>
        <input type="text" value={this.state.newUser} placeholder="Choose a Username" onChange={this.updateNewUser} />
      </div>
      )
  }
});

var AddPassword = React.createClass({
  getInitialState: function(){
    return {
      newPassword: ''
    }
  },
  updateNewPassword: function(event){
    this.setState({
      newPassword: event.target.value
    });
  },
  render: function(){
    return (
        <div>
          <input type="text" value={this.state.newPassword} placeholder="Choose a Password" onChange={this.updateNewPassword} />
        </div>
      )
  }
});

module.exports = SignUp;