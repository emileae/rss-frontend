var React = require('react');
var Channel = require("Channel");

var ChannelList = React.createClass({
  render: function(){
    var channels = this.props.channels;
    var addFeeds = this.props.addFeeds;
    var renderChannels = () => {
      return channels.map((channel)=> {
        return (
          <Channel key={channel._id} {...channel} addFeeds={addFeeds}/>
        )
      });
    };

    return (
      <div>{renderChannels()}</div>
    )
  }
});

module.exports = ChannelList;
