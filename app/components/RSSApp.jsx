var React = require('react');
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

    // APIFetchChannels.fetchChannels().then((res)=>{
    //   console.log("Fetch channel res..: ", res);
    // }).catch((err) => {
    //   console.log("Fetch channel error..: ", err);
    // });

    return {
      channels: []
    }
  },
  fetchChannels: function(){
    console.log("fetching channels for token: ", localStorage.getItem('token'));

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
    console.log("Render Feeds");
  },
  handleAddChannel: function (url){
    alert("New channel: " + url);
  },
  render: function(){
    // var fetchedChannels = this.fetchChannels;
    // console.log("fetchedChannels: ", fetchedChannels());

    var {channels} = this.state;
    return (
      <div>
        <ChannelList channels={channels} addFeeds={this.addFeeds}/>
        <AddChannel onAddChannel={this.handleAddChannel}/>
        <Register/>
        <Login/>
        <Logout/>
        <button className="button" onClick={this.fetchChannels}>Fetch Channels</button>
        <hr/>
        <FeedList/>
      </div>
    )
  }
});

module.exports = RSSApp;
