var React = require('react')
var ReactDOM = require('react-dom')

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
              <li><a href="about.html">About</a></li>
              <li><a href="signin.html">Login</a></li>
              <li><a href="signup.html">Register</a></li>
            </ul>
          </div>
        </nav>
              
    )
  }
});



module.exports = Landing;