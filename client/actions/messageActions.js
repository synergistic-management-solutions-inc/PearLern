var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var messageActions = {
  addMessage: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_MESSAGE,
      // data: item
    });
  },
  // removeItem: function(index){
  //   AppDispatcher.handleAction({
  //     actionType: appConstants.REMOVE_ITEM,
  //     // data: index
  //   })
  // }
};

module.exports = messageActions;
