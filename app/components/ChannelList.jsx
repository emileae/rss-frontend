var React = require('react');
var Channel = require("Channel");

var ChannelList = React.createClass({
  getInitialState: function () {
    return { deleted: [] };
  },
  removeChannel: function(_id){
    console.log("removed channel...");
    var {removeChannel}=this.props;
    removeChannel(_id);
    // this.setState({
    //   deleted: this.state.deleted.concat([_id])
    // })
  },
  render: function(){
    var channels = this.props.channels;
    var addFeeds = this.props.addFeeds;
    var clearFeeds = this.props.clearFeeds;

    var renderChannels = () => {
      return channels
        .filter(channel => this.state.deleted.indexOf(channel._id) === -1)
        .map((channel)=> {
        return (
          <Channel key={channel._id} {...channel} addFeeds={addFeeds} removeChannel={this.removeChannel} clearFeeds={clearFeeds}/>
        )
      });
    };

    return (
      <div>{renderChannels()}</div>
    )
  }
});

module.exports = ChannelList;
