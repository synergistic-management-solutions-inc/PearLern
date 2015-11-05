var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Modal = require('react-modal');

const RaisedButton = require('material-ui/lib/raised-button');

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
      nameValue : '',
      aboutValue : '',
      locationVal: '',
      websiteVal: '',
      githubVal: '',
      joinedVal: '',
      interestValue : ''
    };
  },

  // This fires right before the component mounts. This is where we'll get user profile data.
  componentWillMount: function() {
    var self = this;
    var currentUser = this.props.currentUser;
    //this is a pretty hacky fix to the fact
    //that we don't know how sessions work 
    //in passport
    if (!currentUser){
      this.props.history.pushState(null, '/signin'); 
    }

    $.ajax({
      type : 'GET',
      url : '/users/' + currentUser,
      success : function(res) {
        console.log('self is mounted? ', self.isMounted());
        console.log('get response: ', res);
        if (self.isMounted()) {
          self.setState({
            nameValue : res.name,
            aboutValue : res.about,
            locationVal: res.location,
            websiteVal: res.website,
            githubVal: res.github,
            joinedVal: res.joined,
            interestsValue : res.interests.join(',')
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
  updateName : function(event) {
    this.setState({ nameValue : event.target.value });
  },
  
  updateAbout : function(event) {
    this.setState({ aboutValue : event.target.value });
  },
  
  updateLocation : function(event) {
    this.setState({ locationVal : event.target.value });
  },
  
  updateWebsite : function(event) {
    this.setState({ websiteVal : event.target.value });
  },

  updateGithub : function(event) {
    this.setState({ githubVal : event.target.value });
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
      location: this.state.locationVal,
      website: this.state.websiteVal,
      github: this.state.githubVal,
      interests : interests
    };
    console.log(data);
    $.ajax({
      type : 'POST',
      dataType : 'json',
      url : '/users/' + currentUser,
      data : data
    });
    this.setState({ modalIsOpen : false });
  },

  // Render all the things!
  render : function () {
    var name = this.state.nameValue;
    var about = this.state.aboutValue;
    var location = this.state.locationVal;
    var website = this.state.websiteVal;
    var github = this.state.githubVal;
    var joined = this.state.joinedVal;
    var interests = this.state.interestsValue;
    return (<div>
              <div className="container">
                <div className="row">
                  <div className="col s12">
                    <div className="card blue-grey darken-1">
                      <div className="card-content white-text">
                        <span className="card-title">My Profile</span>
                        <div className="card-action">
                          <div className="black-text">Name:</div>
                          <div className="name">{name}</div>
                          
                          <div className="black-text">About:</div>
                          <div className="about">{about}</div>
                          
                          <div className="black-text">Location:</div>
                          <div className="location">{location}</div>
                          
                          <div className="black-text">Website:</div>
                          <div className="website">{website}</div>
                          
                          <div className="black-text">Github:</div>
                          <div className="github">{github}</div>
                          
                          <div className="black-text">Interests:</div>
                          <div className="interests">{interests}</div>
                          
                          <div className="push"></div>
                          <RaisedButton label="Edit Profile" className="edit-profile" onClick={this.openModal}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}>
                <div className="edit-name">Name
                  <input type="text" value={name} onChange={this.updateName} />
                </div>
                <div className="edit-about">About
                  <input type="text" value={about} onChange={this.updateAbout} />
                </div>
                <div className="edit-location">Location
                  <input type="text" value={location} onChange={this.updateLocation} />
                </div>
                <div className="edit-website">Website
                  <input type="text" value={website} onChange={this.updateWebsite} />
                </div>
                <div className="edit-github">Github
                  <input type="text" value={github} onChange={this.updateGithub} />
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
