var React = require('react');
var $ = require('jquery');
const RaisedButton = require('material-ui/lib/raised-button');

  //an individual contact component
  var Contact = React.createClass({
    selectUser: function(){
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
      var contacts = this.state.contacts.map(function(contact){
        return <div className="z-depth-1"><Contact userSelected={userSelected} key={contact} contact={contact} /></div>
      })

      return (
        <div className="col s3">
          <div className="card light-blue darken-1">
            <div className="contacts">
              <div className="card-content">
                <h4>Contacts</h4>
                {contacts}
              </div>
            </div>
          </div>
        </div>
      )
    }
  })

  //the username of the other user in the conversation
  var OtherUser = React.createClass({
    render: function(){
      return (
        <h5>{this.props.otherUser}</h5>
      );
    }
  })

  //the component for an individual message in a conversation
  var Message = React.createClass({
    render: function(){
      return (
        <div>{this.props.message.text}</div>
      );
    }
  })

  //the component for submitting a new message
  var NewMessage = React.createClass({
    sendMessage: function(text){
      var update = this.props.update;
      var currentUser = this.props.currentUser;
      var message = {
        'to': this.props.otherUser,
        'from': currentUser,
        'text': this.refs.message.getDOMNode().value
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
        <div>
          <input id='mess' ref='message' type='text'></input>
          <RaisedButton id='messButton' label="Send" type="button" className="send-button" onClick={this.sendMessage}/>
        </div>
      )
    }
  })

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
          {conversation}
        </div>
        )
    }
  })

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
  })

  var VideoCall = React.createClass({
    getInitialState: function() {
      return {
        holla: []
      };
    },

    render: function() {
      return (
        <div className="col s5">
          <div className="vidWindow card light-blue darken-1">
            <div className="card-content">
              <div className="z-depth-1 video-container videoPlaceholder">
                <iframe width="853" height="480" src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0"
                  frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
            <div className="card-action">
              <a href="#">CONNECT</a>
            </div>
          </div>
        </div>
      )
    }
  })

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
      //this is a pretty hacky fix to the fact
      //that we don't know how sessions work
      //in passport
      if (!this.props.currentUser){
        this.props.history.pushState(null, '/signin');
      }
    },
    render: function(){
      return (
        <div className="row">
          <Contacts displayConversation={this.displayConversation}
                    otherUser={this.state.otherUser}
                    currentUser={this.props.currentUser}/>
          <Conversations otherUser={this.state.otherUser}
                          currentUser={this.props.currentUser}/>
          <VideoCall />
        </div>
      )
    }
  })

module.exports = Messenger;
