var React = require('react');

var APIAddChannel = require('APIAddChannel');

var AddChannel = React.createClass({
  getInitialState: function(){
    return {
      fetchChannelLoader: false
    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.setState({
      fetchChannelLoader: true
    });
    var channelURL = this.refs.channelURL.value;
    var {onAddChannel} = this.props;
    // validate the url
    if (channelURL.length > 0){
      this.refs.channelURL.value = "";
      APIAddChannel.addChannel(channelURL).then((res)=>{
        console.log("Add channel: ", res);
        this.setState({
          fetchChannelLoader: false
        });
        onAddChannel();
      }).catch((err)=>{
        console.log("Add channel error: ", err);
      });
      // this.props.onAddChannel(channelURL);
    }else{
      this.refs.channelURL.focus();// takes user back to input
    }
  },
  render: function(){
    var {fetchChannelLoader} = this.state;
    function loadingChannel(){
      if (fetchChannelLoader){
        return <p>Loading RSS Channel</p>
      }
    };
    return (
      <div>
        {loadingChannel()}
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="channelURL" placeholder="http://example-feed-url.com"></input>
          <button className="button expanded">Add Channel</button>
        </form>
      </div>
    );
  }
});

module.exports = AddChannel;
