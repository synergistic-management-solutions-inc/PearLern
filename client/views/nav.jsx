var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var Link = require('react-router').Link

var Nav = React.createClass({
  getInitialState: function () {
    return {
      test: 'test value'
    }
  },
  render: function (){
    return (
      <nav>
          <div className="nav-wrapper light-blue">
            <a href="#" className="brand-logo">PearLern</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/signin">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
            </ul>
          </div>
        </nav>
              
    )
  }
});



module.exports = Nav;