var React = require('react')
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');
var Link = require('react-router').Link

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
    var message = this.props.message;
    var currentUser = this.props.currentUser;

    return (
      <div className="other-users-view">
        <div className="row">
          <div className="col s6">
            <img className="responsive-img" src="http://www.actclassy.com/wp-content/uploads/2012/04/Computer-Programmers.jpg" />
          </div>
          <div className="col s6">
          <h4 className="other-users-header">All Users</h4>
          {this.state.users
            .filter(function (element) {
              return element.username !== currentUser;
            })
            .map(
            function (element) {
              return <User  key={element.username} 
                            user={element} 
                            message={message} />
            }
          )}
          </div>
        </div>
      </div>
    );
  }
})


var User = React.createClass({
  openMessenger: function(){
    var username = this.props.user.username;
    this.props.message(username);
  },
  render: function() {
    var user = this.props.user;

    return (
      <div className="col s6">
      <h5>{user.username}</h5>
        <ul>
          <li>
            Name: {user.name}
          </li>
          <li>
            About: {user.about}
          </li>
          <li>
            Interests: {user.interests.toString().split(',').join(', ')}
          </li>
        </ul>
        <Link to="/messenger">
          <RaisedButton onClick={this.openMessenger} 
                        label="Message" />
        </Link>
      </div>
    );
  }
})

module.exports = Users;