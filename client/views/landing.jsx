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
           <img className="responsive-img" src="/images/LandingImage1.jpg"/>
        <div className="row">
            <div className="col s12 s6">
              <h3 className = "landing-header">Find People to Learn With!</h3>
            </div>
        </div>
          <div className="text-header col s6 offset-s3">
            <p>PearLern helps match you with other people sharing the same learning objectives.  For a hefty fee, we will find you an accountabili-buddy to join you on your journey to learn the art of coding!</p>
          </div>
        <div className="push"></div>
      </div>
    )
  }
});

module.exports = Landing;


