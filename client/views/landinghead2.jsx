var React = require('react')
var ReactDOM = require('react-dom')

var SignInHead = React.createClass({
  getInitialState: function () {
    return {
      test: 'test value'
    }
  },
  render: function (){
    return (
      <div>
        <div className="row">
            <div className="col s12 s6">
              <h3>Sign In & Pair Up</h3>
            </div>
        </div>
          <div className="col s12">
            <p>PearLern has connected more than X people looking to learn how to program and helped them collaborate on fun and exciting projects!</p>
          </div>
      </div>
    )
  }
});


module.exports = SignInHead;




