var React = require('react');
var ReactDOM = require('react-dom');
var Profile = require('./views/profile.jsx');
var SignUp = require('./views/signup.jsx');
var AllUsers = require('./views/otherUsers.jsx');
var $ = require('jquery');

ReactDOM.render(<div>
                  <SignUp />
                  <Profile users={Profile.USERS} />
                  // <AllUsers />
                </div>,
                  document.getElementById('app')
                );
