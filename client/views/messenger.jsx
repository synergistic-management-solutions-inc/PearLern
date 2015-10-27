var React = require('react')
var $ = require('jquery');

/*TODO
  [] restructure server GET
  [] attach to main file 
  [] POST on submit
  [] GET real data
*/

  //sample data
  var contacts = [
    {"username": "Shady Pete"},
    {"username": "Helen of Troy"}
  ]

  var conversations = [
    {'user': 'Shady Pete',
    'messages': [
      {
        'to': 'Shady Pete',
        'from': 'User',
        'text': 'You got the goods?'
      }
    ]},
    {'user': 'Helen of Troy',
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
      this.props.userSelected(this.props.contact.username);
    },
    render: function(){
      return (
        <p onClick={this.selectUser}>{this.props.contact.username}</p>
      );
    }
  });

  //the component for the list for all the contacts
  var ContactContainer = React.createClass({
    userSelected: function(username){
      this.props.displayConversation(username);
    },
    render: function(){
      var userSelected = this.userSelected;
      var contacts = this.props.contacts.map(function(contact){
        return <Contact userSelected={userSelected} key={contact.username} contact={contact} />
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

  //the component for an individual username in a conversation
  var User = React.createClass({
    render: function(){
      return (
        <div>{this.props.message.from}: </div>
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
    render: function(){
      return (
        <div>
          <input type='text'></input>
          <button>Send</button>
        </div>
      )
    }
  })

  //the component for the entire conversation with one other user
  var Conversation = React.createClass({
    render: function(){
      var conversation = this.props.conversation.messages.map(function(message){
        return <p><User key={message.from} message={message} /><Message key={message.text} message={message} /></p>
      })

      return (
        <div>
          {conversation}
          <NewMessage /> 
        </div>
        ) 
    }
  })

  //the component for every conversation
  var Conversations = React.createClass({
    render: function(){
      var user = this.props.user;

      //finds and displays the conversation that matches 
      //currently selected user
      var conversations = this.props.conversations
        .filter(function(conversation){
          return (conversation.user === user)
        })
        .map(function(conversation){
          return  <Conversation key={conversation.messages} conversation={conversation} />
        })

      return (
        <div>
          {conversations}
        </div>
      )
    }
  })

  //the main component 
  var Messenger = React.createClass({
    getInitialState: function(){
      return {
        user: conversations[0].user
      }
    },
    displayConversation: function(username){
      this.setState({user: username});
    },
    render: function(){
      var displayConversation = this.displayConversation;
      return (
        <div>
          <ContactContainer displayConversation={displayConversation} user={this.state.user} contacts={contacts} />
          <Conversations user={this.state.user} conversations={conversations} />
        </div>
      )
    }
  })

module.exports = Messenger; 
