var React = require('react')
var ReactDOM = require('react-dom')

var Footer = React.createClass({
  getInitialState: function () {
    return {
      test: 'test value'
    }
  },
  render: function (){
    return (
      <nav>
          <div className="nav-wrapper light-blue">
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <p>PearLern is a Synergistic Management Solutions Company © 2015 SMS World Enterprises plc</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
              
    )
  }
});

module.exports = Footer;