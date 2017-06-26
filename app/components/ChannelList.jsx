var React = require('react');
var Channel = require("Channel");

var ChannelList = React.createClass({
  getInitialState: function () {
    return { deleted: [] };
  },
  removeChannel: function(_id){
    console.log("removed channel...");
    this.setState({
      deleted: this.state.deleted.concat([_id])
    })
  },
  render: function(){
    var channels = this.props.channels;
    var addFeeds = this.props.addFeeds;

    var renderChannels = () => {
      return channels
        .filter(channel => this.state.deleted.indexOf(channel._id) === -1)
        .map((channel)=> {
        return (
          <Channel key={channel._id} {...channel} addFeeds={addFeeds} removeChannel={this.removeChannel}/>
        )
      });
    };

    return (
      <div>{renderChannels()}</div>
    )
  }
});

module.exports = ChannelList;
