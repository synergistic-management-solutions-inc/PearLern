var React = require('react')
var $ = require('jquery');


var Users = React.createClass({
  getInitialState: function() {
    return {users: []};
  },
  componentDidMount: function () {
    var self = this;

    $.ajax({
      type: 'GET',
      url: '/users/',

      success: function(res) {
        if (self.isMounted()) {
          self.setState({users: res.users})
        }
      }
    });
  },
  render: function() {
    return (
      <div className="other-users-container">
        <h3>All Users</h3>
        {this.state.users.map(
          function (element) {
            return <User key={element.username} user={element} />
          }
        )}
      </div>
    );
  }
})


var User = React.createClass({
  render: function() {
    return (
      <div className="other-user-container">
        <ul>
          <li>
            Username: {this.props.user.username}
          </li>
          <li>
            Email: {this.props.user.email}
          </li>
          <li>
            Interests: {this.props.user.interests.toString().split(',').join(', ')}
          </li>
        </ul>
        <button>Message</button>
      </div>
    );
  }
})

module.exports = Users;