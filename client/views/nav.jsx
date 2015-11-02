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
  logout: function(){
    var storeUser = this.props.storeUser;
    console.log('props', this.props);
    //hardcoded
    storeUser('');
    
    /*real code 
    $.ajax({
      type: 'GET',
      url: '/signout'
    })
    .then(function (res){
      storeUser(''); 
    });
    */
  },
  render: function (){
    var currentUser = this.props.currentUser;
    var logout = this.logout;

    var links = function(){
      if (currentUser){
        return (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/all">Find a Partner</Link></li>
            <li><Link to="/messenger">Messenger</Link></li>
            <li onClick={logout}><Link to="/signin">Sign Out</Link></li> 
          </ul>
        )
      } else {
        return (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/signup">Register</Link></li>
          </ul>
        )
      }
    }
    return (
      <nav>
          <div className="nav-wrapper light-blue">
            <img className="pear-logo img-responsive" src="http://www.clker.com/cliparts/y/p/p/E/u/H/green-pear.svg" />
            <a href="#" className="brand-logo">PearLern</a>
            {links()}
          </div>
        </nav>
              
    )
  }
});



module.exports = Nav;