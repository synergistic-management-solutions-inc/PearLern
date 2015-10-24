var React = require('react')
var ReactDOM = require('react-dom');
var $ = require('jquery');

var datastuffs = {users: [
  {
    "username": "cottoncandy",
    "profile": {
      "email": "unicorn@unicorn.com",
      "about": "I like things.",
      "interests": "python"
    }
  },
  {
    "username": "puppies",
    "profile": {
      "email": "unicornpuppies@unicorn.com",
      "about": "I like puppies.",
      "interests": "python"
    }
  }
]}

var AllUsers = React.createClass({
  render: function () {
    console.log(JSON.stringify(datastuffs.users));
    return (
          <div>
            {datastuffs.users.map(function(element) {
              return <div>Username: {JSON.stringify(element.username)} Interests: {JSON.stringify(element.profile.interests)}</div>
            })}
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

ReactDOM.render(<AllUsers />, document.getElementById('app'));

module.exports = AllUsers;
