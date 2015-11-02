// Dependencies
var React = require('react')
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');
var Link = require('react-router').Link


// Top-level component
// currentUser and message props are passed down from app.js
var UserView = React.createClass({
  getInitialState: function() {
    return {query: null};
  },
  search: function(query) {
    this.setState({query: query});
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
            <UserFilter search={this.search} />
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <Users message={this.props.message}
                   currentUser={this.props.currentUser}
                   query={this.state.query} />
          </div>
        </div>
      </div>
    )
  }
});


// Seach bar component
var UserFilter = React.createClass({
  handleInput: function(e) {
    this.props.search(e.target.value);

  },
  render: function() {
    return (
      <form>
        <label>I am looking for people interested in: </label>
        <input type="text" placeholder="Enter a language here" onChange={this.handleInput} />
      </form>
    )
  }
});

// Users component queries database for users
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
          self.setState({users: res.users, 
            message: self.props.message, 
            currentUser: self.props.currentUser})
        }
      }
    });
  },
  render: function() {
    var currentUser = this.props.currentUser;
    var message = this.props.message;
    var query = this.props.query;

    return (
      <div>
        {this.state.users
          .filter(function (element) {
            //filters out current user 
            //and users who haven't entered interests
            if (element.username == currentUser){
              return false;
            }
            else if (element.interests.length === 0){
              return false;
            }
            else if (!query){
              return true;
            }

            //filters based on search query 
            return element.interests.some(function(interest){
              interest = interest.toLowerCase();
              query = query.toLowerCase();
              return interest.indexOf(query) !== -1;
            })
          })
          .map(function (element) {
            return <User  key={element.username} 
                          user={element} 
                          message={message} />
          })
        }
      </div>
    );
  }
})

// User component. Interests is an array, 
// but all of the interests are currently a string in index 0
var User = React.createClass({
  openMessenger: function(){
    var username = this.props.user.username;
    this.props.message(username);
  },
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
        <Link to="/messenger">
          <RaisedButton onClick={this.openMessenger} 
                        label="Message" />
        </Link>
      </div>
    );
  }
})

module.exports = UserView;
