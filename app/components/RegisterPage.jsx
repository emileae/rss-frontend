var React = require('react');
var {hashHistory} = require('react-router');

var APIRegister = require('APIRegister');
var zxcvbn = require('zxcvbn');// password strength lib

var RegisterPage = React.createClass({
  getInitialState: function(){
    return {
      pwScore: 0,
      pwText: "",
      badEmail: false,
      badPassword: false,
      badVerifyPassword: false
    }
  },
  validateEmail: function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  handleRegister: function(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    var verify_password = this.refs.verify_password.value;
    var name = this.refs.name.value;
    var surname = this.refs.surname.value;

    var badEmail = false;
    var badPassword = false;
    var badVerifyPassword = false;

    if (!this.validateEmail(email)){
      badEmail = true;
    };
    if (password.length < 6){
      badPassword = true;
    };
    if (password != verify_password){
      badVerifyPassword = true;
    };

    if (!badEmail && !badPassword && !badVerifyPassword){
      APIRegister.register(email, password, verify_password, name, surname).then((res)=>{
        console.log("registration res: ", res);
        if (res.status === 200){
          this.refs.email.value = "";
          this.refs.password.value = "";
          this.refs.verify_password.value = "";
          this.refs.name.value = "";
          this.refs.surname.value = "";
          var {checkLogin} = this.props;
          checkLogin();
          hashHistory.push("/");
        }else{
          this.refs.email.value = "";
        }
      }).catch((err) => {
        console.log("registration error: ", err);
        hashHistory.push("/register");
      });
    }else{
      this.setState({
        badEmail: badEmail,
        badPassword: badPassword,
        badVerifyPassword: badVerifyPassword
      });
    }

  },
  onPWChange: function(evt){
    this.refs.password.value = evt.target.value;
    var val = zxcvbn(evt.target.value);
    console.log("score: ", val);
    var pwText = "";
    switch(val.score) {
    case 0:
        pwText = "Bad";
        break;
    case 1:
        pwText = "Weak";
        break;
    case 2:
        pwText = "Okay";
        break;
    case 3:
        pwText = "Good";
        break;
    case 4:
        pwText = "Excellent";
        break;
    default:
        pwText = "";
    }

    this.setState({
      pwScore: val.score,
      pwText: pwText
    })
  },
  render: function(){

    var {pwScore, pwText, badEmail, badPassword, badVerifyPassword} = this.state;

    // password score indicator
    var pwScoreWidth = pwScore * 25;
    var pwScoreStyle = {width: pwScoreWidth + "%"}
    var pwTextStyle = {
      fontSize: 0.8+"rem"
    }

    // validation errors

    function badEmailMsg(){
      if (badEmail){
        return (
          <div className="callout alert small" data-closable>
            <p>Please provide a valid email, something like "hello@example.com"</p>
          </div>
        )
      }
    }
    function badPasswordMsg(){
      if (badPassword){
        return (
          <div className="callout alert small" data-closable>
            <p>Please provide a valid password, passwords need to contain at least 6 characters.</p>
          </div>
        )
      }
    }
    function badVerifyPasswordMsg(){
      if (badVerifyPassword){
        return (
          <div className="callout alert small" data-closable>
            <p>Please ensure your passwords match.</p>
          </div>
        )
      }
    }

    return (
      <div className="row">
        <div className="columns expand text-center">
          <h4>Register</h4>
            <form onSubmit={this.handleRegister}>
              <input type="text" ref="name" placeholder="Your name"></input>
              <input type="text" ref="surname" placeholder="Your surname"></input>
              <input type="email" ref="email" placeholder="me@example.com" required></input>
              {badEmailMsg()}
              <input type="password" ref="password" placeholder="Password" onChange={this.onPWChange} autoComplete="off" minLength="6" required></input>
              <div className="progress" role="progressbar" tabindex="0" aria-valuenow={pwScore} aria-valuemin="0" aria-valuemax="4">
                <div className="progress-meter" style={pwScoreStyle}></div>
              </div>
              <p style={pwTextStyle}>{pwText}</p>
              {badPasswordMsg()}
              <input type="password" ref="verify_password" placeholder="Repeat password" autoComplete="off" minLength="6" required></input>
              {badVerifyPasswordMsg()}
              <button className="button">Register</button>
            </form>
        </div>
      </div>
    );
  }
});

module.exports = RegisterPage;
