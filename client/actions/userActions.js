var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var userActions = {
  getAllUsers: function() {
    console.log("action fired #2");
    AppDispatcher.handleAction({
      actionType: appConstants.GET_ALL_USERS
    });
  },

  addUser: function(user){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_USER,
      data: user
    });
  },
  editUser: function(user){
    AppDispatcher.handleAction({
      actionType: appConstants.EDIT_USER,
      data: user
    });
  }
};

module.exports = userActions;
