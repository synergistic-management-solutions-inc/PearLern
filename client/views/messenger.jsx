var React = require('react')
var $ = require('jquery');

/*TODO
  [] test ajax
  [] get current user in a more formalized way
  [] figure out how to pass in otherUser state on redirect 
  [] rerender page  
*/

  //this should be a variable stored as a prop in our highest 
  //component and passed down
  var currentUser = 'User'

//sample data
  var conversations = [
    {'username': 'Shady Pete',
    'messages': [
      {
        'to': 'Shady Pete',
        'from': 'User',
        'text': 'You got the goods?'
      }
    ]},
    {'username': 'Helen of Troy',
    'messages': [
      {
        'to': 'User',
        'from': 'Helen of Troy',
        'text': 'Wassup?'
      },
      {
        'to': 'Helen of Troy',
        'from': 'User',
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
      //hard-coded version
      return {contacts: ['Shady Pete', 'Helen of Troy', 'The Wizard of Sound']}

      /* real version
      return $.ajax({
        type: 'GET',
        url: '/users'
      })
      .then(function(res){
        var state = {contacts: []}
        res.body.users.each(function(user){
          if (user !== currentUser){            
            state.contacts.push()
          }
        })

        return state;
      })
      */

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
      console.log('props', this.props.conversation);

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
          <NewMessage OtherUser={this.props.conversation.username}/> 
        </div>
        ) 
    }
  })

  //the component for every conversation
  var Conversations = React.createClass({
    getInitialState: function(){
      //hard coded version:
      return {conversations: conversations}

      /*real version
      return $.ajax({
        type: 'GET',
        url: '/messages/'+currentUser
      })
      .then(function(res){
        return res.body; 
      })
      */
      
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
          <Conversation key={conversation.messages} conversation={conversation} />
        </div>
      )
    }
  })

  //the main component 
  var Messenger = React.createClass({
    getInitialState: function(){
      return {
        //should be able to take an initial state
        otherUser: this.props.otherUser || conversations[0].username
      }
    },
    displayConversation: function(username){
      this.setState({otherUser: username});
    },
    render: function(){
      var displayConversation = this.displayConversation;
      return (
        <div>
          <Contacts displayConversation={displayConversation} otherUser={this.state.otherUser} />
          <Conversations otherUser={this.state.otherUser} />
        </div>
      )
    }
  })

module.exports = Messenger; 