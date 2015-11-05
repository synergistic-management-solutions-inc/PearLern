var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Modal = require('react-modal');

var profileActions {
  openModal : function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal : function() {
    this.setState({modalIsOpen: false});
  },

  // Handlers for user input fields. Updates state (value of input)
  updateName : function(event) {
    this.setState({ nameValue : event.target.value });
  },

  updateAbout : function(event) {
    this.setState({ aboutValue : event.target.value });
  },

  updateInterests : function(event) {
    this.setState({ interestsValue : event.target.value });
  },

  saveData : function() {
    var currentUser = this.props.currentUser;
    var interests = this.state.interestsValue.split(',');

    var data = {
      name : this.state.nameValue,
      about : this.state.aboutValue,
      interests : interests
    };

    $.ajax({
      type : 'POST',
      dataType : 'json',
      url : '/users/' + currentUser,
      data : data
    });
    this.setState({ modalIsOpen : false });
  },
}

module.exports = profileActions;