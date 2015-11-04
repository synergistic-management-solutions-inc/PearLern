var React = require('react');
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');
var Link = require('react-router').Link;
var userActions = require('../actions/userActions');
var userStore = require('../stores/userStore');



var Users = React.createClass({
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
      console.log('users information: ' + this.state.users);
      if (this.state.users.length) {
        var holla = this.state.users.map(function (e) {
          return e.name;
        });
        return <div>{holla}</div>
      }
      return <div>hi</div>
    }
});

module.exports = Users;
