var React = require('react');
var ChannelList = require("ChannelList");
var AddChannel = require("AddChannel");
var Login = require('Login');

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
      channels: [
        {
          id: 1,
          title: 'Channel A'
        },
        {
          id: 2,
          title: 'Channel B'
        }
      ]
    }
  },
  fetchChannels: function(){
    APIFetchChannels.fetchChannels().then((res)=>{
      console.log("Fetch channel res: ", res);
    }).catch((err) => {
      console.log("Fetch channel error: ", err);
    });
  },
  handleAddChannel: function (url){
    alert("New channel: " + url);
  },
  render: function(){
    var fetchedChannels = this.fetchChannels;
    console.log("fetchedChannels: ", fetchedChannels());
    var {channels} = this.state;
    return (
      <div>
        <ChannelList channels={channels}/>
        <AddChannel onAddChannel={this.handleAddChannel}/>
        <Login/>
      </div>
    )
  }
});

module.exports = RSSApp;
