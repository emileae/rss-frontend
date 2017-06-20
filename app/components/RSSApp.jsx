var React = require('react');
var ChannelList = require("ChannelList");

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
  render: function(){
    var {channels} = this.state;
    return (
      <div>
        <ChannelList channels={channels}/>
      </div>
    )
  }
});

module.exports = RSSApp;
