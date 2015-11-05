var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var authActions = {
  
  validateUser: function () {
    var storeUser = this.props.storeUser;
    var username = this.state.username;
    var password = this.state.password;
    var history = this.props.history;

    //Composes new user instance from current username/password state & posts to server
    var User = {
      username: username,
      password: password
    }

    $.ajax({
      type: 'POST',
      url: '/signin',
      data: User
    })
    .then(function (res){
      //TODO: check that the user is validated

      //sets the app state currentUser
      storeUser(username);

      //redirects to profile page 
      history.pushState(null, '/profile');

      //this will work but is a bit uncouth
      //also, need sessions  
      // window.location.assign("/");
      
      // AppDispatcher.handleAction({
      //   actionType: appConstants.VALIDATE.USER
      // });
    });
  },
  updateUsername: function (event) {
    // this.setState({
    //   username: event.target.value.substr(0, 30)
    // });
    
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE.USERNAME
    });

  },
  updatePassword: function (event) {
    // this.setState({
    //   password: event.target.value.substr(0, 30)
    // });

    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE.PASSWORD
    });
  },
};

module.exports = authActions;
