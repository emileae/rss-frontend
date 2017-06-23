var React = require('react');
var ChannelList = require("ChannelList");
var FeedList = require("FeedList");
var AddChannel = require("AddChannel");
var Nav = require('Nav');
var Register = require('Register');
var Login = require('Login');
var Logout = require('Logout');

// API
var APIFetchChannels = require('APIFetchChannels');

var Main = React.createClass({
  getInitialState: function(){
    // keep login state in main parent
    var token = localStorage.getItem("token");
    if (!token || token === null || token === undefined){
      localStorage.setItem('token', '');
      token = '';
    }

    var loggedIn = token.length > 0 ? true : false;

    return {
      loggedIn: loggedIn
    };

  },
  checkLogin: function(){
    console.log("------ check login");
    var token = localStorage.getItem("token");
    var loggedIn = token.length > 0 ? true : false;
    this.setState({
      loggedIn: loggedIn
    });
  },
  render: function(){
    // var fetchedChannels = this.fetchChannels;
    // console.log("fetchedChannels: ", fetchedChannels());
    var {loggedIn} = this.state;
    console.log("Main loggedIn: ", loggedIn);
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       checkLogin: this.checkLogin,
       isLoggedIn: loggedIn
     })
    );

    return (
      <div className="container">
        <Nav checkLogin={this.checkLogin} isLoggedIn={loggedIn}/>

        {childrenWithProps}

      </div>
    )
  }
});

module.exports = Main;
