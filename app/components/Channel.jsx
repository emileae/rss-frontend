var React = require('react');
var APIFetchFeeds = require('APIFetchFeeds');
var RemoveChannel = require("RemoveChannel");

var Channel = React.createClass({
  fetchFeeds: function(channelId){
    APIFetchFeeds.fetchFeeds(channelId).then((feeds) => {
      console.log("Got feeds: ", feeds.data);
      this.props.addFeeds(feeds.data);
    }).catch((err)=> {
      console.log("Fetching feed error");
    });
  },
  render: function(){
    var {title, removeChannel, clearFeeds} = this.props;
    var {_id} = this.props;
    return (
      <div className="callout">
        <RemoveChannel channelId={_id} removeChannel={removeChannel} clearFeeds={clearFeeds}/>
        <p className="channel-title" onClick={() => this.fetchFeeds(_id)}>
          {title}
        </p>
      </div>
    )
  }
});

module.exports = Channel;
