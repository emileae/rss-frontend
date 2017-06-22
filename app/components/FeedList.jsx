var React = require('react');
var Feed = require("Feed");

var FeedList = React.createClass({
  render: function(){
    var {feeds} = this.props;
    var renderFeeds = () => {
      return feeds.map((feed)=> {
        return (
          <Feed key={feed._id} {...feed}/>
        )
      });
    };

    return (
      <div>{renderFeeds()}</div>
    )
  }
});

module.exports = FeedList;
