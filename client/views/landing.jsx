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
          <ul className="collection">
            <li className="collection-item"> <img className="responsive-img" src="http://pairprogrammingisfun.com/images/header.jpg"/> </li>
          </ul>
        <div className="push"></div>
      </div>
    )
  }
});

module.exports = Landing;
