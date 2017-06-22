var React = require('react');
var {hashHistory} = require('react-router');

var APILogout = require('APILogout');

var Logout = React.createClass({
  handleLogout: function(e){
    e.preventDefault();
    var {checkLogin} = this.props;
    APILogout.logout().then((res)=>{
      console.log("logout res: ", res);
      checkLogin();
      hashHistory.push("/");
    }).catch((err) => {
      console.log("logout error: ", err);
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
    return (
      <div>
          <button className="button" onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
});

module.exports = Logout;
