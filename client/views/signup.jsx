var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var Link = require('react-router').Link
var validator = require('validator');
var Validation = require('react-validation');

const RaisedButton = require('material-ui/lib/raised-button');

//TODOs: 
//Add form validation
//Add novaldiate to forms to override default HTML 5 validation?
//Server response codes

//CUSTOM VALIDATION RULES FOR VALIDATE.JS, ported via react-validation
 Validation.extendErrors({
  checkPassword: {
    className: 'ui-input_state_invalid-user',
    message: 'Passwords do not match!',
    rule: function(value) {
        return this.state.password === this.state.validatePassword;
    }
  },
  isRequired: {
    className: 'ui-input-state-empty',
    message: 'Required!',
    rule: function(value) {
        return Boolean(validator.trim(value));  //what is validator.trim?
    }
  },
});


var SignUp = React.createClass({
  getInitialState: function (){
    return {
      username: '',
      password: '',
      validate: '',
      matchFail: false
    }
  },
  addUser: function (event) {
    //Composes new user instance from current username/password state & posts to server
    event.preventDefault();
    var newUser = {
      username: this.state.username,
      password: this.state.password
    } 
    console.log("newUser:", newUser);
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: newUser
    })
    .then(function (err,res){
      if (err) {
        console.log(err)
      } //send 20? on success?
    });
  },
  updateUsername: function (event) {
    this.setState({
      username: event.target.value.substr(0, 30)
    });
  },
  updatePassword: function (event) {
    this.setState({
      password: event.target.value.substr(0, 30)
    });
  },
  validatePassword: function (event) {
    this.setState({
      validate: event.target.value.substr(0, 30)
    });
  },
  render: function () {
    return (
      <div className="sign-up-view">
        <div className="row">
          <div className="col s6">
            <img className="responsive-img" src="http://pairprogrammingisfun.com/images/header.jpg"/>
          </div>
          <div className="col s6">
            <h4 className="signup-header">Sign Up</h4> 

            <Validation.Form onSubmit={this.addUser} >
              <Validation.Input
                blocking='input'    
                className='ui-input'   
                className='username-input'
                validations={[
                  {
                    rule: 'isRequired'
                  }
                ]}
                name= 'username'
                placeholder='Choose a Username'
                onChange={this.updateUsername}
                type='text'/>

              <Validation.Input
                blocking='input'
                className='ui-input' 
                className='password-input'
                validations={[
                  {
                    rule: 'isRequired'
                  }
                ]}
                name='password'
                placeholder='Choose a Password'
                onChange={this.updatePassword}
                type='password'/>

                <Validation.Input
                blocking='input'
                className='ui-input' 
                className='password-validate'
                validations={[
                  {
                    rule: 'matchesPassword'
                  }
                ]}
                name='password-validation'
                placeholder='Re-enter Password'
                onChange={this.validatePassword}
                type='password'/>

              <Validation.Button label="Register" className="submit-button" onClick={this.addUser} value="Submit"/> 
              <p className="signup-footer">Already registered? <Link to='/signin'>Sign in!</Link></p>
            </Validation.Form>
          </div>
        </div>
        <div className="push"></div>
      </div>
    )
  }
});

module.exports = SignUp;
