var React = require('react')
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');

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
      <div className="other-users-view">
        <div className="row">
          <div className="col s6">
            <img className="responsive-img" src="http://www.actclassy.com/wp-content/uploads/2012/04/Computer-Programmers.jpg" />
          </div>
          <h4 className="other-users-header">All Users</h4>
          {this.state.users.map(
            function (element) {
              return <User key={element.username} user={element} />
            }
          )}
        </div>
      </div>
    );
  }
})


var User = React.createClass({
  render: function() {
    return (
      <div className="col s6">
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
        <RaisedButton label="Message" />
      </div>
    );
  }
})

module.exports = Users;