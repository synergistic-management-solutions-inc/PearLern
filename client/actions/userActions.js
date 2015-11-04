var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var userActions = {
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
    })
  }
};

module.exports = userActions;
