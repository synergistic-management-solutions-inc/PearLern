var React = require('react')
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Modal = require('react-modal');

// Modal options see: https://www.npmjs.com/package/react-modal
var customStyles = {

  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)',
  },

  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// This is one BIG component. Will need to break this down somehow.
var Profile = React.createClass({

  // Set the initial value input fields (using dummy data for now) and state of modal
  getInitialState : function() {
    return { 
      modalIsOpen : false,
      emailValue : '',
      aboutValue : '',
      interestsValue : ''
    };
  },

  // This fires right before the component mounts. This is where we'll get user profile data.
  componentWillMount: function() {
    var self = this;
    $.ajax({
      type : 'GET',
      url : '/users/helen_of_troy',
      success : function(res) {
        if (self.isMounted()) {
          self.setState({
            emailValue : res.email,
            aboutValue : res.about,
            interestsValue : res.interests[0]
          });
        }
      }
    });
  },


  openModal : function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal : function() {
    this.setState({modalIsOpen: false});
  },

  // Handlers for user input fields. Updates state (value of input)
  updateEmail : function(event) {
    this.setState({ emailValue : event.target.value });
  },

  updateAbout : function(event) {
    this.setState({ aboutValue : event.target.value });
  },

  updateInterests : function(event) {
    this.setState({ interestsValue : event.target.value });
  },

  saveData : function() {
    var data = {
      email : this.state.emailValue,
      about : this.state.aboutValue,
      interests : this.state.interestsValue
    }

    $.ajax({
      type : 'POST',
      dataType : 'json',
      url : '/users/helen_of_troy',
      data : data
    })
    this.setState({ modalIsOpen : false })
  },
  // /Handlers


  // Render all the things!
  render : function () {
    var email = this.state.emailValue;
    var about = this.state.aboutValue;
    var interests = this.state.interestsValue;
    return (<div>
              <div className="container">
                <div className="email-label">Email</div>
                <div className="email">{email}</div>
                <div className="about-label">About</div>
                <div className="about">{about}</div>
                <div className="interests-label">Interests</div>
                <div className="interests">{interests}</div>
                <button className="edit-profile" onClick={this.openModal}>Edit Profile</button>
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}>
                <div className="edit-email">Email
                  <input type="text" value={email} onChange={this.updateEmail} />
                </div>
                <div className="edit-about">About
                  <input type="text" value={about} onChange={this.updateAbout} />
                </div>
                <div className="edit-interests">Interests
                  <input type="text" value={interests} onChange={this.updateInterests} />
                </div>
                <button className="edit-save" onClick={this.saveData}>Save</button>
                </Modal>
              <div className="push"></div>
            </div>
            );
  }
})

module.exports = Profile;