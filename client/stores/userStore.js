var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var $ = require('jquery')

var CHANGE_EVENT = 'change';



var _store = {
  list: []
};

var addUser = function(user) {
  _store.list.push(user);
};

var editUser = function(user) {
  // _store.list.splice(index, 1);
}

var getAll = function(cb) {
  console.log("getting all users #5")
  return $.ajax({
    type: 'GET',
    url: '/users/',

    // success: function(res) {
    //   //   if (self.isMounted()) {
    //   //     self.setState({
    //   //       users: res.users,
    //   //       message: self.props.message,
    //   //       currentUser: self.props.currentUser
    //   //     })
    //   //   }
    //   // }
    //   console.log("users received #6 " , res.users)
    //   var data = res.users;
    //   _store.list = data;
    // }
  }).then(function(res) {
    console.log("users received #6", res.users);
    var data = res.users;
    _store.list = data;
    return data;
  });
}

var userStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getUsers: function() {
    return _store.list;
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.actionType) {
    case appConstants.ADD_USER:
      addItem(action.data);
      userStore.emit(CHANGE_EVENT);
      break;
    case appConstants.EDIT_USER:
      removeItem(action.data);
      userStore.emit(CHANGE_EVENT);
      break;
    case appConstants.GET_ALL_USERS:
      console.log("get all fired #4")
      getAll().then(function() {
      console.log("change event fired #7")
        userStore.emit(CHANGE_EVENT);
      })
      break;
    default:
      return true;
  }
});

module.exports = userStore;
