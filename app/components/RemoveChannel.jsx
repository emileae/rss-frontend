var React = require('react');

var APIRemoveChannel = require('APIRemoveChannel');

var RemoveChannel = React.createClass({
  removeChannel: function(){
    var {channelId} = this.props;
    APIRemoveChannel.removeChannel(channelId);
  },
  render: function(){
    return (
        <button className="button" onClick={this.removeChannel}>Remove</button>
    );
  }
});

module.exports = RemoveChannel;
