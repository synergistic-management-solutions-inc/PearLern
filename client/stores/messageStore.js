var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: []
};

var addMessage = function(message){
  _store.list.push(message);
};

// var removeItem = function(index){
//   _store.list.splice(index, 1);
// }

var messageStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getMessages: function(){
    return _store.list;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_MESSAGE:
      addItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    // case appConstants.REMOVE_ITEM:
    //   removeItem(action.data);
    //   todoStore.emit(CHANGE_EVENT);
    //   break;
    default:
      return true;
  }
});

module.exports = messageStore;
