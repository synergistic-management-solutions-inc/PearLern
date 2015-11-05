var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var $ = require('jquery')

var CHANGE_EVENT = 'change';


// validateUser: function () {
//     var storeUser = this.props.storeUser;
//     var username = this.state.username;
//     var password = this.state.password;
//     var history = this.props.history;

//     //Composes new user instance from current username/password state & posts to server
//     var User = {
//       username: username,
//       password: password
//     }

//     $.ajax({
//       type: 'POST',
//       url: '/signin',
//       data: User
//     })
//     .then(function (res){
//       //TODO: check that the user is validated

//       //sets the app state currentUser
//       storeUser(username);

//       //redirects to profile page 
//       history.pushState(null, '/profile');

//       //this will work but is a bit uncouth
//       //also, need sessions  
//       // window.location.assign("/");
//     });
//   },
//   updateUsername: function (event) {
//     this.setState({
//       username: event.target.value.substr(0, 30)
//     });
    

//   },
//   updatePassword: function (event) {
//     this.setState({
//       password: event.target.value.substr(0, 30)
//     });
//   },
// };

var authStore = objectAssign({}, EventEmitter.prototype, {
  

});


AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.actionType) {
    case appConstants.VALIDATE_USER:
      console.log('validating user...')
      authStore.emit(CHANGE_EVENT);
      break;
    case appConstants.UPDATE_USERNAME:
      console.log('updating username...')

      authStore.emit(CHANGE_EVENT);
      break;
    case appConstants.UPDATE_PASSWORD:
      console.log('updating password...')
      authStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = authStore;
