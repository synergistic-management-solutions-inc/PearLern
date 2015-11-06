var React = require('react');
var ReactDOM = require('react-dom');

var SignInHead = React.createClass({
  getInitialState: function () {
    return {
      test: 'test value'
    };
  },
  render: function (){
    return (
      <div>
        <div className="row">
            <div className="col s12 s6 offset-s1">
              <h4>Pair Up & Get Learning</h4>
              <p>PearLern has connected more than X people looking to learn how to program and helped them collaborate on fun and exciting projects!</p>
            </div>
        </div>
      </div>
    )
  }
});

module.exports = SignInHead;

