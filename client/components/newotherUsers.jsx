var React = require('react');
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');
var Link = require('react-router').Link;
var userActions = require('../actions/userActions');
var userStore = require('../stores/userStore');



var UserView = React.createClass({
  getInitialState: function() {
    return {
      users: []
    };
  },

  componentWillMount: function() {
    console.log('component has mounted #1');
    userActions.getAllUsers();
  },


  componentWillUnmount: function() {
    userStore.removeChangeListener(this._onChange);
  },

  componentDidMount: function() {
    console.log('componentdidmount');
    userStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log('change event from store #8');
    this.setState({
      users: userStore.getUsers()
    });
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <img className="responsive-img" src="http://www.actclassy.com/wp-content/uploads/2012/04/Computer-Programmers.jpg" />
          </div>
          <div className="col s6">
            <h4 className="other-users-header">Find A Partner</h4>
            <Users userList={this.state.users} />
          </div>
        </div>
      </div>
    )
  }
});

var Users = React.createClass({
  render: function() {
    return (
      <div>{this.props.userList
        .map(function(element) {
          return <User user={element} />
        })
      }</div>
    )
  }
});

var User = React.createClass({
  render: function() {
    var user = this.props.user;
      return (
        <div className="col s6">
          <ul>
            <h5>{user.username}</h5>
            <li>
              Name: {user.name}
            </li>
            <li>
              About: {user.about}
            </li>
            <li>
              Interests: {user.interests.join(', ')}
            </li>
          </ul>
        </div>
  )}
});


module.exports = UserView;
