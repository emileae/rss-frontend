var React = require('react');
var APIFetchFeeds = require('APIFetchFeeds');

var Channel = React.createClass({
  fetchFeeds: function(channelId){
    APIFetchFeeds.fetchFeeds(channelId).then((feeds) => {
      console.log("Got feeds: ", feeds);
      this.props.addFeeds(feeds);
    }).catch((err)=> {
      console.log("Fetching feed error");
    });
  },
  render: function(){
    var {title} = this.props;
    var {_id} = this.props;
    return (
      <div onClick={() => this.fetchFeeds(_id)}>
        {title}
      </div>
    )
  }
});

module.exports = Channel;
