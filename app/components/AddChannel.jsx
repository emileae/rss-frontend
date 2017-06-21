var React = require('react');

var APIAddChannel = require('APIAddChannel');

var AddChannel = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var channelURL = this.refs.channelURL.value;

    // validate the url
    if (channelURL.length > 0){
      this.refs.channelURL.value = "";
      APIAddChannel.addChannel(channelURL).then((res)=>{
        console.log("Add channel: ", res);
      }).catch((err)=>{
        console.log("Add channel error: ", err);
      });
      // this.props.onAddChannel(channelURL);
    }else{
      this.refs.channelURL.focus();// takes user back to input
    }
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="channelURL" placeholder="http://example-feed-url.com"></input>
          <button className="button expanded">Add Channel</button>
        </form>
      </div>
    );
  }
});

module.exports = AddChannel;
