var React = require('react');
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');
var download = require('../lib/download');

var peer = null;
var cons = {};
var file = null;
var fileInfo = {};

var reader = new FileReader();

var getFileType = function(fileType) {
  if (fileType.match(/image.*/)) {
    return 'image';
  } else if (fileType.match(/text.*/)) {
    return 'text';
  } else {
    return 'text';
  }
};

//an individual contact component
var Contact = React.createClass({

  selectUser: function() {
    console.log('Contact - this.props:', this.props);
    var contact = this.props.contact;
    var currentUser = this.props.currentUser;
    var peerCon = peer.connect(contact);
    cons[this.props.contact] = {};
    cons[this.props.contact].con = peerCon;
    cons[this.props.contact].connected = false;
    cons[this.props.contact].state = {};

    var userPeer = cons[this.props.contact];

    console.log('Contact peerCon:', peerCon);
    peerCon.on('open', function() {
      userPeer.connected = true;
      console.log('Connected to peer:', contact);
      var toSend = {
        type: 'message',
        data: 'Hi ' + contact + '! I am ' + currentUser
      };
      peerCon.send(toSend);
    });

    peerCon.on('error', function(err) {
      console.log('Peer error:', err);
    });

    this.props.userSelected(this.props.contact);
  },
  render: function(){
    return (
      <p onClick={this.selectUser}>{this.props.contact}</p>
    );
  }
});

//the component for the list for all the contacts
var Contacts = React.createClass({
  getInitialState: function(){

    //the empty array
    //a placeholder until the
    //server sends data
    return {contacts: []}

  },
  componentDidMount: function(){
    var component = this;
    var currentUser = this.props.currentUser;

    $.ajax({
      type: 'GET',
      url: '/users'
    })
    .then(function(res){
      var state = {contacts: []}
      res.users.forEach(function(user){
        if (user.username !== currentUser){
          state.contacts.push(user.username);
        }
      })

      // if (!component.props.otherUser){
      //   var firstContact = state.contacts[0];
      //   component.props.displayConversation(firstContact);
      // }

      //setting the state will automatically re-render
      component.setState(state);
    })
  },
  userSelected: function(username){
    this.props.displayConversation(username);
  },
  render: function(){

    var userSelected = this.userSelected;
    var currentUser = this.props.currentUser;
    var contacts = this.state.contacts.map(function(contact){
      return ( <div className="z-depth-1 grey-text text-lighten-1"><Contact currentUser={currentUser} userSelected={userSelected} key={contact} contact={contact} /></div> )
    })

    return (
      <div className="col s3">
        <div className="card blue-grey darken-1">
          <div className="contacts">
            <div className="card-content">
              <h4 className="white-text">Contacts</h4>
              {[contacts]}
            </div>
          </div>
        </div>
      </div>
    )
  }
});

//the username of the other user in the conversation
var OtherUser = React.createClass({
  render: function(){
    return (
      <h5>{this.props.otherUser}</h5>
    );
  }
});

//the component for an individual message in a conversation
var Message = React.createClass({
  render: function(){
    return (
      <div>{this.props.message.text}</div>
    );
  }
});

//the component for submitting a new message
var NewMessage = React.createClass({
  sendMessage: function(text){
    var update = this.props.update;
    var currentUser = this.props.currentUser;
    var message = {
      'to': this.props.otherUser,
      'from': currentUser,
      'text': this.refs.message.value
    };

    $.ajax({
      type: 'POST',
      url: '/messages',
      data: message,
      success: function(res){
        //should re-render page;
        update();
      }
    })
  },
  render: function(){
    return (
      <div className="row messageInput">
        <input className="col s9" id="mess" ref="message" type="text" placeholder="Type here"></input>
        <a id="messButton" label="Send" type="button" className="btn btn-small"
          onClick={this.sendMessage}>+</a>
      </div>
    )
  }
});

//the component for the entire conversation with one other user
var Conversation = React.createClass({
  render: function(){
    var currentUser = this.props.currentUser;
    var otherUser = this.props.otherUser;
    var conversation = this.props.conversation.messages.map(function(message){
      //checks if the message in incoming or outgoing
      //for styling purposes
      if (message.to === currentUser){
        var className = 'incoming';
        var user = otherUser;
      }
      else {
        var className = 'outgoing';
        var user = currentUser;
      }

      return <div className={className}><Message key={message.text} message={message} currentUser={currentUser}/></div>
    })

    return (
      <div>
        <OtherUser otherUser={this.props.conversation.username}/>
        <NewMessage currentUser={currentUser}
                    otherUser={this.props.conversation.username}
                    update={this.props.update}/>
        {[conversation]}
      </div>
      )
  }
});

//the component for every conversation
var Conversations = React.createClass({
  getInitialState: function(){
    return {conversations: []}
  },
  componentDidMount: function(){
    var update = this.update;

    //grabs the initial message data
    update();

    //checks for new messages every two seconds
    setInterval(update, 2000);
  },
  update: function(){
    var component = this;
    var currentUser = this.props.currentUser;

    if (this.isMounted()){
      $.ajax({
        type: 'GET',
        url: '/messages/'+currentUser
      })
      .then(function(res){
        //gives conversation data to the state and automatically re-renders
         component.setState(res);
      })
    }
  },
  render: function(){
    var otherUser = this.props.otherUser;
    var currentUser = this.props.currentUser;
    var conversation = {username: otherUser, messages: []}

    //grabs any messages from the state
    this.state.conversations.forEach(function(conv){
      if (conv.username === otherUser){
        conversation.messages = conv.messages;
      }
    })

    if (this.props.otherUser) {
      return (
        <div className="col s4">
          <div className="card grey lighten-3">
            <div className="card-content">
              <Conversation key={conversation.messages}
                            conversation={conversation}
                            update={this.update}
                            currentUser={currentUser}/>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="col s4">
          <div className="card grey lighten-3">
            <div className="card-content">
              Select a contact to connect with.
            </div>
          </div>
        </div>
      )
    }
  }
});

//the main component
var Messenger = React.createClass({
  getInitialState: function(){
    return {
      //other user represents the user whose conversation
      //is currently being displayed

      //this can be intially set to a particular user when
      //linked from the otherUsers page or it will be auto
      //set to the first user on the list
      otherUser: this.props.messageTo
    }
  },

  displayConversation: function(username){
    this.setState({otherUser: username});
  },

  componentWillMount: function(){
    var self = this;
    console.log('Messenger will mount')
    //this is a pretty hacky fix to the fact
    //that we don't know how sessions work
    //in passport
    if (!this.props.currentUser){
      this.props.history.pushState(null, '/signin');
      return;
    }

    peer = new Peer(this.props.currentUser, {
      host: window.location.hostname,
      port: process.env.PORT, // provided to client by envify
      path: '/peerjs'
    });

    peer.on('connection', function(con) {
      console.log('New connection');
      con.on('data', function(data) {
        console.log(data.dataType);
        console.log(data.data);
        if (data.dataType === 'file') {
          self.receiveFile(data);
        }
      });
    });

    peer.on('error', function(err) {
      console.log('Peer error:', err);
    });

  },

  selectFile: function(e) {
    var self = this;
    var el = e.target;
    console.log('we are doing stuff!!!!', e);
    if (!el.files.length) {
      this.setState({ hasFile: false });
    } else {
      var file = el.files[0];
      var type = getFileType(file.type);
      console.log('File got!', file);

      reader.onload = function() {
        fileInfo = {
          dataType: 'file',
          name: file.name,
          lastModified: file.lastModified,
          size: file.size,
          type: type,
          mimeType: file.type || 'text/plain',
          info: reader.result
        };
      };

      reader.onloadend = function() {
        self.setState({ hasFile: true, fileInfo: file.name, displayArea: reader.result});
      };

      if (type === 'image') {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
  },

  sendFile: function() {
    var other = this.state.otherUser;
    console.log('Inside sendFile', other, cons[other], this.props);
    if (this.isValidCon()) {
      console.log('Sending file:', other, fileInfo);
      cons[other].con.send(fileInfo);
    }
  },

  receiveFile: function(data) {
    console.log('Got file:', data);
    this.setState({ fileInfo: data.name, displayArea: data.info });
  },

  downloadFile: function() {
    // TODO : make work with images too, the data is sent already
    download(this.state.displayArea, this.state.fileInfo, 'text/plain');
  },

  isValidCon: function() {
    var other = this.state.otherUser;
    console.log('isValidCon', cons[other].con);
    if (other && cons[other] && cons[other].con.open) {
      return true;
    }
    return false;
  },

  displaySelectFile: function() {

    // if (cons[other] !== undefined && cons[other].peer.open) {
    //   console.log('here');
      return (
        <div className="btn">
          <span>Select a File</span>
          <input className="btn" type="file" onChange={this.selectFile} />
        </div>
      )
    // }
    // return null;
  },

  displaySendButton: function() {
    // var other = this.state.otherUser;
    // console.log('displaySendButton:', other);

    // if (!this.state.hasFile || cons[other] === undefined || !cons[other].peer.open) {
    //   return null;
    // }
    return (
      <div className="btn" onClick={this.sendFile}>
        <span>Send File</span>
      </div>
    )
  },

  displayDownloadButton: function() {
    return (
      <div className="btn" onClick={this.downloadFile}>
        <span>Download File</span>
      </div>
    )
  },

  render: function() {
    return (
      <div className="row" id="nosideMargin">
        <Contacts displayConversation={this.displayConversation}
                  otherUser={this.state.otherUser}
                  currentUser={this.props.currentUser} />
        <Conversations otherUser={this.state.otherUser}
                        currentUser={this.props.currentUser} />
        <div className="col s5">

          <div className="row">
            <div className="vidWindow card light-blue darken-1">
              <div className="card-content">
                <div className="z-depth-1 video-container videoPlaceholder">

                </div>
              </div>
              <div className="card-action">
                <a href="#">CONNECT</a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="file-field input-field">
              {this.displaySelectFile()}
            </div>
          </div>
              {this.displaySendButton()}
              {this.displayDownloadButton()}
          <div className="row">
            <div>
              {this.state.fileInfo}
            </div>
            <div>
              <pre>{this.state.displayArea}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Messenger;
