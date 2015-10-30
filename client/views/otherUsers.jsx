var React = require('react')
var $ = require('jquery');


var User = React.createClass({
  // Setting default state to empty strings to avoid errors
  getInitialState: function() {
    return { 
      usernameValue: '',
      interestsValue: '',
      emailValue: ''
    };
  },

  componentDidMount: function () {
    // The docs said to do ajax in componentDidMount
    var self = this;
    // Doing a GET request to /users
    $.ajax({
      type: 'GET',
      url: '/users/',

      // TO DO: Error handling
      success: function(res) {
        if (self.isMounted()) {
          self.setState({
            users: res.users[0],
            usernameValue: res.users[0].username,
            interestsValue: res.users[0].interests,
            emailValue: res.users[0].email
          });
        }
      }
    });
  },

  render: function() {
    var username = this.state.usernameValue;
    var interests = this.state.interestsValue;
    var email = this.state.emailValue;
    return (
      <div>
        <ul>
          <li className="username">Username: {username}</li>
          <li className="interests">Interests: {interests}</li>
          <li className="email">Email: {email}</li>
        </ul>
      </div>
    );
  }
})

module.exports = User;