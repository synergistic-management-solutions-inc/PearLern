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
  componentDidMount: function() {
    var users = this.props.userList
    console.log(users)
  },
  render: function() {
    return (
      <div>{this.props.userList
        .map(function(element) {
          return element.name
        })
      }</div>
    )
  }
});


module.exports = UserView;
