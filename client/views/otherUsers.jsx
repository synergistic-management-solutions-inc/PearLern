var React = require('react')
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');
var Link = require('react-router').Link

var UserView = React.createClass({
  getInitialState: function() {
    return {query: null};
  },
  search: function(query) {
    this.setState({query: query});
    console.log(query)
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
            return element.username !== currentUser;
          })
          .filter(function (element) {
            console.log('queryblargl', query);
            console.log('interests', element.interests)
            if (element.interests.length === 0){
              return false;
            }
            else if (!query){
              return true;
            }

            return element.interests[0].indexOf(query) !== -1;
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

module.exports = UserView;
