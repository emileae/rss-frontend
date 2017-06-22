var React = require('react');
var {hashHistory} = require('react-router');

var APILogin = require('APILogin');
var $ = require('jquery');

var LoginPage = React.createClass({
  handleLogin: function(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;

    APILogin.login(email, password).then((res)=>{
      console.log("login res: ", res);
      var {checkLogin} = this.props;
      checkLogin();
      hashHistory.push("/");
    }).catch((err) => {
      console.log("login error: ", err);
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
    return (
      <div className="row">
        <div className="columns expand text-center">
          <h4>Login</h4>
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
