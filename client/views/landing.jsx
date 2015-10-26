var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')

var Landing = React.createClass({
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
              <li><a href="sass.html">About</a></li>
              <li><a href="badges.html">Login</a></li>
              <li><a href="collapsible.html">Register</a></li>
            </ul>
          </div>
        </nav>
              
    )
  }
});



module.exports = Landing;