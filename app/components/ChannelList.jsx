var React = require('react');
var Channel = require("Channel");

var ChannelList = React.createClass({
  render: function(){
    var {channels} = this.props;
    var renderChannels = () => {
      return channels.map((channel)=> {
        return (
          <Channel key={channel.id} {...channel}/>
        )
      });
    };

    return (
      <div>{renderChannels()}</div>
    )
  }
});

module.exports = ChannelList;
