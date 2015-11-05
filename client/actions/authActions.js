var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var authActions = {
  
  validateUser: function () {
     AppDispatcher.handleAction({
      actionType: appConstants.VALIDATE_USER
    });
  },
  updateUsername: function (event) {
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_USERNAME
    });

  },
  updatePassword: function (event) {
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_PASSWORD
    });
  },
};

module.exports = authActions;
