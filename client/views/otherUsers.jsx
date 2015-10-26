var React = require('react')
var ReactDOM = require('react-dom');
var $ = require('jquery');



var AllUsers = React.createClass({
  render: function () {
    return (
          <div>
            <OneUser />
          </div>)
  }
});


// TO DO: Add AJAX stuff, replace dummy data with real data, implement mapping
var OneUser = React.createClass({
    getInitialState: function() {
      return {
        username: '',
        interest: ''
      };
    },
    // Need component did mount for AJAX requests. Remember to check if component did mount.
    componentDidMount: function () {
      var datastuffs = {users: [
        {
          "username": "cottoncandy",
          "profile": {
            "email": "unicorn@unicorn.com",
            "about": "I like things.",
            "interests": ["python"]
          }
        },
        {
          "username": "puppies",
          "profile": {
            "email": "unicornpuppies@unicorn.com",
            "about": "I like puppies.",
            "interests": ["python"]
          }
        }
      ]};
      if (this.isMounted()) {
        this.setState({
          username: datastuffs.users[0].username,
          interests: datastuffs.users[0].profile.interests
        })
      }
    },
    render: function() {
        return (<div>Username: {this.state.username}, Interests: {this.state.interests}</div>);
    }
});

// ReactDOM.render(<AllUsers />, document.getElementById('app'));

module.exports = AllUsers;
