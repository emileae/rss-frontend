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
    console.log("Component will mount... RSSApp");
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
  removeChannel: function(channelId){
    console.log("REMOVE CHANNELLLLL");
    var currentChannels = this.state.channels;
    var newChannels = [];
    for (var i=0; i<currentChannels.length; i++){
      if (currentChannels[i]._id != channelId){
        newChannels.push(currentChannels[i]);
      }
    }
    this.setState({
      channels: [
        ...newChannels
      ]
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
  handleFetchChannel: function (url){
    this.fetchChannels();
  },
  render: function(){
    // var fetchedChannels = this.fetchChannels;
    // console.log("fetchedChannels: ", fetchedChannels());

    var {channels} = this.state;
    var {feeds} = this.state;

    var {isLoggedIn} = this.props;
    var fetchChannelHandler = this.handleFetchChannel;
    var addFeedsHandler = this.addFeeds;
    var clearFeeds = this.clearFeeds;
    var removeChannel = this.removeChannel;

    function renderPrompt(){
      if (!isLoggedIn){
        return <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to add RSS channels</p>
      }
    }
    function renderAddChannel(){
      if (isLoggedIn){
        return <AddChannel onAddChannel={fetchChannelHandler}/>
      }
    }
    function renderUserChannels(){
      if (isLoggedIn){
        return <ChannelList channels={channels} addFeeds={addFeedsHandler} removeChannel={removeChannel} clearFeeds={clearFeeds}/>
      }
    }
    function renderUserFeeds(){
      if (isLoggedIn){
        return <FeedList feeds={feeds}/>
      }
    }

    return (
      <div className="feed-container">
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
