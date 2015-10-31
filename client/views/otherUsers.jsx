var React = require('react')
var $ = require('jquery');


var Users = React.createClass({
  getInitialState: function() {
    return {users: []};
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
          self.setState({users: res.users})
        }
      }
    });
  },
  render: function() {
    return (
      <div>
        {this.state.users.map(
          function (element) {
            return <User user={element} />
          }
        )}
      </div>
    );
  }
})


var User = React.createClass({
  render: function() {
    return (
      <ul>
        <li>
          {this.props.user.username}
        </li>
      </ul>
    );
  }
})

module.exports = Users;