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
    var {title} = this.props;
    var {_id} = this.props;
    return (
      <div>
        <div onClick={() => this.fetchFeeds(_id)}>
          {title}
        </div>
        <RemoveChannel channelId={_id}/>
      </div>
    )
  }
});

module.exports = Channel;
