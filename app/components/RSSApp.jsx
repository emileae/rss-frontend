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
      channels: [],
      feeds: []
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
    console.log("Render Feeds", this.state);
    this.setState({
      feeds: [
        ...feeds
      ]
    })
  },
  handleAddChannel: function (url){
    alert("New channel: " + url);
  },
  render: function(){
    // var fetchedChannels = this.fetchChannels;
    // console.log("fetchedChannels: ", fetchedChannels());

    var {channels} = this.state;
    var {feeds} = this.state;
    return (
      <div className="row">
        <div className="columns large-4">
          <AddChannel onAddChannel={this.handleAddChannel}/>
          <ChannelList channels={channels} addFeeds={this.addFeeds}/>
        </div>
        <div className="columns large-8">
          <Register/>
          <Login/>
          <Logout/>
          <button className="button" onClick={this.fetchChannels}>Fetch Channels</button>
          <hr/>
          <FeedList feeds={feeds}/>
        </div>
        // <ChannelList channels={channels} addFeeds={this.addFeeds}/>
        // <AddChannel onAddChannel={this.handleAddChannel}/>
        // <Register/>
        // <Login/>
        // <Logout/>
        // <button className="button" onClick={this.fetchChannels}>Fetch Channels</button>
        // <hr/>
        // <FeedList feeds={feeds}/>
      </div>
    )
  }
});

module.exports = RSSApp;
