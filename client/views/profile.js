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

// This is one BIG component. Will need to break this down somehow. Also it's displaying right on our app home.
// We will need some sort of routing.
var Profile = React.createClass({

  // Set the initial value of email (using dummy data for now) and state of modal
  getInitialState : function() {
    return { 
      modalIsOpen : false,
      emailValue : this.props.users[0].profile.email
    };
  },

  openModal : function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal : function() {
    this.setState({modalIsOpen: false});
  },

  // Handler for user input into the email field. Updates state (value of input)
  updateEmail : function(event) {
    this.setState({ emailValue : event.target.value });
  },

  // Render all the things!
  render : function () {
    var email = this.state.emailValue;
    var about = this.props.users[0].profile.about;
    var interest = this.props.users[0].profile.interest;
    return (<div>
              <div className="profile">
                <div className="email-label">Email</div>
                <div className="email">{email}</div>
                <div className="about-label">About</div>
                <div className="about">{about}</div>
                <div className="interest-label">Interest</div>
                <div className="interest">{interest}</div>
              </div>
              <button className="edit-profile" onClick={this.openModal}>Edit Profile</button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}>
                <div className="edit-email">Email
                  <input type="text" value={email} onChange={this.updateEmail} />
                </div>

                </Modal>
            </div>
            );
  }
})

// Dummy data
Profile.USERS = [
  { username : 'Scott',
    password : '123',
    profile : {
      email : 'sschwa12@gmail.com',
      about : 'I enjoy drinking beer and writing javascript',
      interest : 'Javascript'
    }
  }
]


module.exports = Profile;