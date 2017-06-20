var React = require('react');
var ChannelList = require("ChannelList");
var AddChannel = require("AddChannel");
var Login = require('Login');

var RSSApp = React.createClass({
  getInitialState: function(){
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
  handleAddChannel: function (url){
    alert("New channel: " + url);
  },
  render: function(){
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
