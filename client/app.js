var React = require('react')
var ReactDOM = require('react-dom');
var Profile = require('./views/profile.js');
var $ = require('jquery');


var App = React.createClass({
 render: function () {
   return (<div className="container" id="container">Container</div>);
 }
})

ReactDOM.render(<div><App />
                  <Profile users={Profile.USERS} /></div>,
                  document.getElementById('app'));