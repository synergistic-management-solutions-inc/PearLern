var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Landing = React.createClass({
  getInitialState: function () {
    return {
      test: 'test value'
    };
  },
  render: function (){
    return (
      <div className="container">
        <div className="row">
            <div className="col s12 s6">
              <h3>Find People to Learn With!</h3>
            </div>
        </div>
          <div className="col s12">
            <p>PearLern helps match you with other people sharing the same learning objectives.  For a hefty fee, we will find you an accountabili-buddy to join you on your journey to learn the art of coding!</p>
          </div>
          <div className="slider">
    <ul className="slides">
      <li>
        <img className="responsive-img" src="http://pairprogrammingisfun.com/images/header.jpg"> <!-- random image -->
        <div className="caption center-align">
          <h3>This is our big Tagline!</h3>
          <h5 className="light grey-text text-lighten-3"></h5>
        </div>
      </li>
    </ul>
 </div>
        <div className="push"></div>
      </div>
    )
  }
});

module.exports = Landing;

 
