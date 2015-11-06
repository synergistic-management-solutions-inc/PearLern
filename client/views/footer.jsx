var React = require('react');
var ReactDOM = require('react-dom');

var Footer = React.createClass({
  getInitialState: function () {
    return {
      test: 'test value'
    };
  },
  componentWillMount: function() {
    console.log('Footer got mounted, yo');
  },

  render: function (){
    return (
      <footer>
        <div className="nav-wrapper blue-grey darken-4">
          <div className="row">
            <div className="col s12">
              <p className='footer-text'>PearLern is a Horse Management Solutions Company © 2015 SMS World Enterprises plc</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
});

module.exports = Footer;
