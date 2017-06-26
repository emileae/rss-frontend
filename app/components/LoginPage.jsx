var React = require('react');
var {hashHistory} = require('react-router');

var APILogin = require('APILogin');
var $ = require('jquery');

var LoginPage = React.createClass({
  getInitialState: function(){
    return {
      invalidLogin: false,
      blocked: false,
      attempts: 0
    }
  },
  handleLogin: function(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;

    APILogin.login(email, password).then((res)=>{
      console.log("login res: ", res);
      var {unBlockTime, token, loginAttempts} = res.data;
      console.log("loginAttempts: ", loginAttempts);
      if (loginAttempts > 0){
        this.setState({
          invalidLogin: false,
          attempts: loginAttempts
        });
      }
      localStorage.setItem("token", res.data.token);
      var {checkLogin} = this.props;
      checkLogin();
      hashHistory.push("/");
    }).catch((err) => {
      console.log("login error: ", err);
      var {unBlockTime, token, loginAttempts} = err.data;
      unBlockTime = new Date(unBlockTime).getTime();
      console.log("loginAttempts err: ", loginAttempts);
      if (loginAttempts > 0){
        this.setState({
          invalidLogin: false,
          attempts: loginAttempts
        });
      }else if (loginAttempts === undefined){
        this.setState({
          invalidLogin: true
        });
      }
      if (unBlockTime > new Date().getTime()){

        var timeToUnBlock = unBlockTime - new Date().getTime();
        var minutesToUnBlock = Math.floor((timeToUnBlock % (1000 * 60 * 60)) / (1000 * 60));
        console.log("minutesToUnBlock: ", minutesToUnBlock);

        this.setState({
          invalidLogin: false,
          blocked: true,
          unBlockTime: unBlockTime,
          minutesToUnBlock: minutesToUnBlock
        });
      }
    });

    // TODO: validate login details

    //

    // if (channelURL.length > 0){
    //   this.refs.channelURL.value = "";
    //   this.props.onAddChannel(channelURL);
    // }else{
    //   this.refs.channelURL.focus();// takes user back to input
    // }
  },
  render: function(){
    var {handleLogin} = this.props;
    var {attempts, blocked, minutesToUnBlock, invalidLogin} = this.state;
    function badLogins(){
      if (attempts > 0 && !blocked){
        return (
          <p>Invalid login you have: {5 - attempts} attempts remaining</p>
        )
      }else if (blocked){
        return(
          <p>Your account has been blocked, you can login in {minutesToUnBlock} minute(s).</p>
        )
      }else if (invalidLogin){
        return(
          <p>Invalid login.</p>
        )
      }
    }
    return (
      <div className="row">
        <div className="columns large-6 large-offset-3 text-center">
          <h4>Login</h4>
          {badLogins()}
          <form onSubmit={this.handleLogin}>
            <input type="email" ref="email" placeholder="me@example.com"></input>
            <input type="password" ref="password" placeholder="password"></input>
            <button className="button">Login</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
