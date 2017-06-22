var React = require('react');

var APILogin = require('APILogin');
var $ = require('jquery');

var LoginModal = React.createClass({
  componentDidMount: function(){
    var {resetModal} = this.props;
    var modal = new Foundation.Reveal($("#login-modal"));// used jquery selector, configured in webpack
    modal.open();
    console.log("Open modal");
  },
  handleLogin: function(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;

    APILogin.login(email, password).then((res)=>{
      console.log("login res: ", res);
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
      <div className="reveal tiny text-center" id="login-modal" data-reveal="">
        <h4>Login</h4>
        <form onSubmit={this.handleLogin}>
          <input type="email" ref="email" placeholder="me@example.com"></input>
          <input type="password" ref="password" placeholder="password"></input>
          <button className="button">Login</button>
        </form>
      </div>
    );
  }
});

module.exports = LoginModal;