var React = require('react');
var {Link} = require('react-router');

var ChannelList = require("ChannelList");
var FeedList = require("FeedList");
var AddChannel = require("AddChannel");
var Register = require('Register');
var Login = require('Login');
var Logout = require('Logout');

// API
var APIFetchChannels = require('APIFetchChannels');

var RSSApp = React.createClass({
  getInitialState: function(){
    var token = localStorage.getItem("token");
    var loggedIn = token.length > 0 ? true : false;
    console.log("loggedIn", loggedIn);
    return {
      loggedIn:loggedIn,
      showLoginModal: false,
      channels: [],
      feeds: []
    }
  },
  componentWillMount: function(){
    APIFetchChannels.fetchChannels().then((res)=>{
      console.log("Fetch channel res: ", res);
      this.setState({
        channels: [
          ...res.data
        ]
      })
    }).catch((err) => {
      console.log("Fetch channel error: ", err);
    });
  },
  fetchChannels: function(){
    APIFetchChannels.fetchChannels().then((res)=>{
      console.log("Fetch channel res: ", res);
      this.setState({
        channels: [
          ...res.data
        ]
      })
    }).catch((err) => {
      console.log("Fetch channel error: ", err);
    });

  },
  addFeeds: function(feeds){
    console.log("Render Feeds", this.state);
    this.setState({
      feeds: [
        ...feeds
      ]
    })
  },
  clearFeeds: function(){
    this.setState({
      feeds: []
    })
  },
  clearChannels: function(){
    this.setState({
      channels: []
    })
  },
  handleAddChannel: function (url){
    alert("New channel: " + url);
    this.fetchChannels();
  },
  render: function(){
    // var fetchedChannels = this.fetchChannels;
    // console.log("fetchedChannels: ", fetchedChannels());

    var {channels} = this.state;
    var {feeds} = this.state;

    var {isLoggedIn} = this.props;
    var addChannelHandler = this.handleAddChannel;
    var addFeedsHandler = this.addFeeds;

    function renderPrompt(){
      if (!isLoggedIn){
        return <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to add RSS cahnnels</p>
      }
    }
    function renderAddChannel(){
      if (isLoggedIn){
        return <AddChannel onAddChannel={addChannelHandler}/>
      }
    }
    function renderUserChannels(){
      if (isLoggedIn){
        return <ChannelList channels={channels} addFeeds={addFeedsHandler}/>
      }
    }
    function renderUserFeeds(){
      if (isLoggedIn){
        return <FeedList feeds={feeds}/>
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="columns large-4">
            {renderAddChannel()}
            {renderUserChannels()}
          </div>
          <div className="columns large-8">
            {renderPrompt()}
            {renderUserFeeds()}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = RSSApp;
