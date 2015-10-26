var React = require('react')
var ReactDOM = require('react-dom');
var $ = require('jquery');

var datastuffs = {users: [
  {
    "username": "cottoncandy",
      "email": "unicorn@unicorn.com",
      "about": "I like things.",
      "interests": ["python"]
  },
  {
    "username": "puppies",
      "email": "unicornpuppies@unicorn.com",
      "about": "I like puppies.",
      "interests": ["python"]
  },
  {
    "username": "blargl",
      "email": "unicornpuppiesdlfjsdklfj@unicorn.com",
      "about": "I like puppies.",
      "interests": ["ruby"]
  }
]}

// TODO replace example email address
var AllUsers = React.createClass({
  componentDidMount: function () {
    var self = this;
    console.log('hitting');
    $.ajax({
      type : 'GET',
      contentType : 'json',
      url : '/users',
      success: function(result) {
        if (self.isMounted()){
          self.setState({
            username: result.users[0].username,
            interests: result.users[0].interests
          })
        }
        console.log("result:", result)
      },
      error: function(err){
        console.log("Error:", err)
      }
    })
  },
  render: function () {
    // console.log(JSON.stringify(datastuffs.users));
    return (
      <div className="other-users-container">
        <button onClick={this.getUsers}>fdsfjskfj</button>
        <ul>
          {datastuffs.users.map(function(element) {
            return (<li>
              <p>Username: {JSON.stringify(element.username).replace(/"|'/g,"")}</p>
              <p>Interests: {JSON.stringify(element.interests).replace(/[\[\]"|']+/g, "")}</p>
              <p>
                Email: <a href="mailto:someone@example.com">{JSON.stringify(element.email).replace(/"|'/g,"")}</a>
              </p>
              <br />
            </li>)
          })}
        </ul>
      </div>

    )
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
    render: function() {
        return (
            <div>Username: {this.state.username}, Interests: {this.state.interests}</div>
        );
    }
});

// ReactDOM.render(<AllUsers />, document.getElementById('app'));

module.exports = AllUsers;
