var React = require('react')
var $ = require('jquery');

/*TODO
  [x] fix server
  [x] test ajax
    [x] contacts
    [x] convos
    [x] submit
  [] learn more about keys
  [] look into console warnings 
  [] get it to stop pinging when the page is left
  [] figure out how to pass in otherUser state on redirect 
  [x] auto rerender page  
  [] get current user in a more formalized way
  [] prevent page from breaking if no other users exist
  [] clean up/comment code 
*/

  //this should be a variable stored as a prop in our highest 
  //component and passed down
  var currentUser = 'user'

//sample data
  var conversations = [
    {'username': 'shady_pete',
    'messages': [
      {
        'to': 'shady_pete',
        'from': 'user',
        'text': 'You got the goods?'
      }
    ]},
    {'username': 'helen_of_troy',
    'messages': [
      {
        'to': 'user',
        'from': 'helen_of_troy',
        'text': 'Wassup?'
      },
      {
        'to': 'helen_of_troy',
        'from': 'user',
        'text': 'Not much.'
      }
    ]}
  ]

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
        
        if (!component.props.otherUser){
          var firstContact = state.contacts[0];
          component.props.displayConversation(firstContact);
        }
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
        return <Contact userSelected={userSelected} key={contact} contact={contact} />
      })

      return (
        <div>
          <h4>Contacts</h4>
          <div>
            {contacts}
          </div>
        </div>
      )
    }
  })

  //the username of the other user in the conversation
  var OtherUser = React.createClass({
    render: function(){
      return (
        <h5>{this.props.otherUser} </h5>
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
          <input ref='message' type='text'></input>
          <button onClick={this.sendMessage}>Send</button>
        </div>
      )
    }
  })

  //the component for the entire conversation with one other user
  var Conversation = React.createClass({
    render: function(){
      var conversation = this.props.conversation.messages.map(function(message){
        //checks if the message in incoming or outgoing
        //for styling purposes
        if (message.to === currentUser){
          var className = 'incoming';
        }
        else {
          var className = 'outgoing';
        } 

        return <div className={className}><Message key={message.text} message={message} /></div>
      })

      return (
        <div>
          <OtherUser otherUser={this.props.conversation.username}/>
          {conversation}
          <NewMessage otherUser={this.props.conversation.username}
                      update={this.props.update}/> 
        </div>
        ) 
    }
  })

  //the component for every conversation
  var Conversations = React.createClass({
    getInitialState: function(){
      //hard coded version for testing:
      //return {conversations: conversations}

      //real version
      return {conversations: []}

    },
    componentDidMount: function(){
      var update = this.update;

      //grabs the initial message data
      //then checks for new messages every two seconds
      update();
      setInterval(update, 2000);
    },
    update: function(){
      var component = this;

      $.ajax({
        type: 'GET',
        url: '/messages/'+currentUser
      })
      .then(function(res){
        //gives conversation data to the state and automatically re-renders
         component.setState(res);
      })
    },
    render: function(){
      var otherUser = this.props.otherUser;
      var conversation = {username: otherUser, messages: []}

      //grabs any messages from the state
      this.state.conversations.forEach(function(conv){
        if (conv.username === otherUser){
          conversation.messages = conv.messages;
        }
      })

      return (
        <div>
          <Conversation key={conversation.messages} 
                        conversation={conversation}
                        update={this.update} />
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
    render: function(){
      return (
        <div>
          <Contacts displayConversation={this.displayConversation} 
                    otherUser={this.state.otherUser} />
          <Conversations otherUser={this.state.otherUser} />
        </div>
      )
    }
  })

module.exports = Messenger; 
