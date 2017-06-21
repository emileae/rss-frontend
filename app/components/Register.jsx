var React = require('react');

var APIRegister = require('APIRegister');

var Login = React.createClass({
  handleRegister: function(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    var verify_password = this.refs.verify_password.value;
    var name = this.refs.name.value;
    var surname = this.refs.surname.value;

    APIRegister.register(email, password, verify_password, name, surname).then((res)=>{
      console.log("registration res: ", res);
      this.refs.email.value = "";
      this.refs.password.value = "";
      this.refs.verify_password.value = "";
      this.refs.name.value = "";
      this.refs.surname.value = "";
    }).catch((err) => {
      console.log("registration error: ", err);
    });

    // TODO: validate registration details

    //

    // if (channelURL.length > 0){
    //   this.refs.channelURL.value = "";
    //   this.props.onAddChannel(channelURL);
    // }else{
    //   this.refs.channelURL.focus();// takes user back to input
    // }
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.handleRegister}>
          <input type="text" ref="name" placeholder="Your name"></input>
          <input type="text" ref="surname" placeholder="Your surname"></input>
          <input type="email" ref="email" placeholder="me@example.com"></input>
          <input type="password" ref="password" placeholder="Password"></input>
          <input type="password" ref="verify_password" placeholder="Repeat password"></input>
          <button className="button">Register</button>
        </form>
      </div>
    );
  }
});

module.exports = Login;
