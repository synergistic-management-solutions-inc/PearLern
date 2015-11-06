// Dependencies
var React = require('react');
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');
var Link = require('react-router').Link;
var userActions = require('../actions/userActions');
var userStore = require('../stores/userStore');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const CardActions = require('material-ui/lib/card/card-actions');
const Avatar = require('material-ui/lib/avatar');
const IconButton = require('material-ui/lib/icon-button');


// Top-level component
// currentUser and message props are passed down from app.js
var UserView = React.createClass({
  getInitialState: function() {
    return {query: null};
  },

  search: function(query) {
    this.setState({query: query});
  },

  componentWillMount: function(){
    //this is a pretty hacky fix to the fact
    //that we don't know how sessions work
    //in passport
    if (!this.props.currentUser){
      this.props.history.pushState(null, '/signin');
    }
  },

  // We would love to see the images be in the assets folder instead of linked from a url
  // but we ran into difficulty doing so.
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <img className="responsive-img" src="/images/otherUsersImage.jpg" />
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
            // filters out current user
            if (element.username == currentUser){
              return false;
            }
            // filters out users who haven't entered interests
            else if (element.interests.length === 0){
              return false;
            }
            // if there is no search query, return all users
            else if (!query){
              return true;
            }

            // filters to show only users whose
            // interests contain the search query
            return element.interests
            .some(function(interest){
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

// User component
var User = React.createClass({
  openMessenger: function(){
    var username = this.props.user.username;
    this.props.message(username);
  },
  render: function() {
    var user = this.props.user;

    return (

        <div className="col s3">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                <Avatar style={{backgroundColor:'white',color:'#546e7a'}}>{user.name[0]}</Avatar>
                <span>      {user.name}</span>
              </span>
              <div className="card-action">
                <div className="profile-text">Name: {user.name}</div>
                <div className="profile-text">Location: {user.about}</div>
                <div className="profile-text">Interests: {user.interests.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>


    );
  }
})

module.exports = UserView;
